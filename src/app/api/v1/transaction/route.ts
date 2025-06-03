import { supabase } from "@/lib/db";
import { MidtransClient } from "midtrans-node-client";

const snap = new MidtransClient.Snap({
  isProduction: true,
  serverKey: process.env.NEXT_PUBLIC_MIDTRANS_SERVER_KEY as string,
});

export async function POST(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Invalid JSON request", error }),
        { status: 400 }
      );
    }

    const { idFiles, idForms } = body;
    if (!idFiles || !idForms) {
      return new Response(
        JSON.stringify({ message: "idFiles and idForms are required" }),
        { status: 400 }
      );
    }

    const { data: dataFiles, error: errorFiles } = await supabase
      .from("files")
      .select()
      .eq("id", idFiles)
      .single();
    if (errorFiles || !dataFiles) {
      return new Response(
        JSON.stringify({ message: "File not found", error: errorFiles }),
        { status: 404 }
      );
    }

    const { data: dataForms, error: errorForms } = await supabase
      .from("forms")
      .select()
      .eq("id", idForms)
      .single();
    if (errorForms || !dataForms) {
      return new Response(
        JSON.stringify({ message: "Form not found", error: errorForms }),
        { status: 404 }
      );
    }

    const hargaWarna = process.env.NEXT_PUBLIC_HARGA_WARNA as string;
    const hargaHitam = process.env.NEXT_PUBLIC_HARGA_HITAM_PUTIH as string;
    if (!hargaWarna || !hargaHitam) {
      return new Response(
        JSON.stringify({ message: "Harga configuration is missing" }),
        { status: 500 }
      );
    }

    let hargaPerHalaman: number;
    if (dataForms.opsi === "Hitam-putih") {
      hargaPerHalaman = parseInt(hargaHitam) * dataFiles.page;
    } else {
      hargaPerHalaman = parseInt(hargaWarna) * dataFiles.page;
    }

    const parameters = {
      transaction_details: {
        order_id: idForms,
        gross_amount: hargaPerHalaman,
      },
      enabled_payments: ["echannel"],
    };

    let token: string;
    try {
      const response = await snap.createTransaction(parameters);
      token = response.token;
    } catch (midtransError) {
      return new Response(
        JSON.stringify({
          message: "Error creating Midtrans transaction",
          error: midtransError,
        }),
        { status: 500 }
      );
    }

    const { data: dataInsertTransaction, error: errorInsertTransaction } =
      await supabase
        .from("transactions")
        .insert({
          id_form: idForms,
          id_files: idFiles,
          status: "pending",
          midtrans_token: token,
          harga: hargaPerHalaman,
        })
        .select()
        .single();
    if (errorInsertTransaction) {
      return new Response(
        JSON.stringify({
          message: "Error inserting transaction",
          error: errorInsertTransaction,
        }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Transaction created successfully",
        data: dataInsertTransaction,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal server error", error }),
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (error) {
      return new Response(
        JSON.stringify({ message: "Invalid JSON request", error }),
        { status: 400 }
      );
    }

    const { idTransaction, status } = body;
    if (!idTransaction || !status) {
      return new Response(
        JSON.stringify({ message: "idTransaction and status are required" }),
        { status: 400 }
      );
    }

    const { data: dataUpdateTransaction, error: errorUpdateTransaction } =
      await supabase
        .from("transactions")
        .update({ status: status })
        .eq("id", idTransaction)
        .select()
        .single();
    if (errorUpdateTransaction) {
      return new Response(
        JSON.stringify({ message: "Error updating transaction" }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        dataUpdateTransaction,
        message: "Transaction updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Internal server error", error }),
      { status: 500 }
    );
  }
}
