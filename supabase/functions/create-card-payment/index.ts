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
    const MP_ACCESS_TOKEN = Deno.env.get("MP_ACCESS_TOKEN");

    if (!MP_ACCESS_TOKEN) {
      throw new Error("Mercado Pago access token not configured");
    }

    const { amount, token, installments, customer, items, address, paymentMethodId, issuerId } = await req.json();

    if (!amount || !token || !customer) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orderCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const payload: Record<string, any> = {
      transaction_amount: Number(amount),
      token,
      description: `Pedido ${orderCode}`,
      installments: Number(installments) || 1,
      payment_method_id: paymentMethodId,
      issuer_id: issuerId ? String(issuerId) : undefined,
      payer: {
        email: customer.email,
        first_name: customer.name?.split(" ")[0] || "",
        last_name: customer.name?.split(" ").slice(1).join(" ") || "",
        identification: {
          type: "CPF",
          number: customer.cpf?.replace(/\D/g, ""),
        },
      },
    };

    if (address) {
      payload.additional_info = {
        items: items?.map((item: any, i: number) => ({
          id: `item-${i}`,
          title: `Pedido ${orderCode}`,
          quantity: String(item.quantity),
          unit_price: String(item.price),
        })),
        payer: {
          first_name: customer.name?.split(" ")[0] || "",
          last_name: customer.name?.split(" ").slice(1).join(" ") || "",
          phone: {
            area_code: customer.phone?.replace(/\D/g, "").substring(0, 2) || "",
            number: customer.phone?.replace(/\D/g, "").substring(2) || "",
          },
          address: {
            zip_code: address.cep?.replace(/\D/g, ""),
            street_name: address.street,
            street_number: address.number,
            city: address.city,
            federal_unit: address.state,
          },
        },
      };
    }

    console.log("Creating Mercado Pago card payment:", JSON.stringify(payload));

    const response = await fetch("https://api.mercadopago.com/v1/payments", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
        "X-Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("MP card response:", response.status, JSON.stringify(data));

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Payment creation failed", details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(JSON.stringify({
      id: data.id,
      status: data.status,
      status_detail: data.status_detail,
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Error creating card payment:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
