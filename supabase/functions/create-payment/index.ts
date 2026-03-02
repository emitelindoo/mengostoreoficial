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

    const { amount, customer, items, address } = await req.json();

    if (!amount || !customer || !items) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate short order ID for description
    const orderCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const payload: Record<string, any> = {
      transaction_amount: Number(amount),
      payment_method_id: "pix",
      description: `Pedido ${orderCode}`,
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
        items: items.map((item: any, i: number) => ({
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
        shipments: {
          receiver_address: {
            zip_code: address.cep?.replace(/\D/g, ""),
            street_name: address.street,
            street_number: address.number,
            city_name: address.city,
            state_name: address.state,
          },
        },
      };
    }

    console.log("Creating Mercado Pago PIX payment:", JSON.stringify(payload));

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
    console.log("Mercado Pago response status:", response.status);

    if (!response.ok) {
      console.error("Mercado Pago error:", JSON.stringify(data));
      return new Response(
        JSON.stringify({ error: "Payment creation failed", details: data }),
        { status: response.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Extract PIX data from MP response
    const pixData = data.point_of_interaction?.transaction_data;

    const result = {
      id: data.id,
      status: data.status,
      qr_code: pixData?.qr_code,
      qr_code_base64: pixData?.qr_code_base64,
      ticket_url: pixData?.ticket_url,
    };

    return new Response(JSON.stringify(result), {
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
