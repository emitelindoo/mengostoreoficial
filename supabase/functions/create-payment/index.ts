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

    const { amount, customer, items, address } = await req.json();

    if (!amount || !customer || !items) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build Basic auth
    const encoder = new TextEncoder();
    const credentials = encoder.encode(`${NIVUS_PUBLIC_KEY}:${NIVUS_SECRET_KEY}`);
    const base64Credentials = btoa(String.fromCharCode(...credentials));

    const payload = {
      amount: Math.round(amount * 100), // Nivus expects cents
      paymentMethod: "pix",
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone?.replace(/\D/g, ""),
        document: {
          type: "cpf",
          number: customer.cpf?.replace(/\D/g, ""),
        },
      },
      items: items.map((item: any) => ({
        title: item.name,
        quantity: item.quantity,
        unitPrice: Math.round(item.price * 100),
        tangible: true,
      })),
      shipping: address
        ? {
            name: customer.name,
            fee: 0,
            address: {
              street: address.street,
              streetNumber: address.number,
              complement: address.complement || "",
              neighborhood: address.neighborhood,
              city: address.city,
              state: address.state,
              zipCode: address.cep?.replace(/\D/g, ""),
              country: "BR",
            },
          }
        : undefined,
    };

    console.log("Creating Nivus payment with payload:", JSON.stringify(payload));

    const response = await fetch("https://api.nivuspayments.com.br/v1/transactions", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64Credentials}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Nivus response status:", response.status, "data:", JSON.stringify(data));

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Payment creation failed", details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error creating payment:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
