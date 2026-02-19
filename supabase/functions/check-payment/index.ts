import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const NIVUS_PUBLIC_KEY = Deno.env.get("NIVUS_PUBLIC_KEY");
    const NIVUS_SECRET_KEY = Deno.env.get("NIVUS_SECRET_KEY");

    if (!NIVUS_PUBLIC_KEY || !NIVUS_SECRET_KEY) {
      throw new Error("Nivus Pay keys not configured");
    }

    const { transactionId } = await req.json();

    if (!transactionId) {
      return new Response(
        JSON.stringify({ error: "Missing transactionId" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const encoder = new TextEncoder();
    const credentials = encoder.encode(`${NIVUS_PUBLIC_KEY}:${NIVUS_SECRET_KEY}`);
    const base64Credentials = btoa(String.fromCharCode(...credentials));

    const response = await fetch(`https://api.nivuspayments.com.br/v1/transactions/${transactionId}`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    console.log("Nivus check-payment status:", data?.status, "id:", transactionId);

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to check payment", details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ status: data.status, paidAt: data.paidAt }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error checking payment:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
