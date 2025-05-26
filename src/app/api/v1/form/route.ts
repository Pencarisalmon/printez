import { supabase } from "@/lib/db";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { username, phoneNumber, type, place, dob, time } = body;

        // Validasi input
        if (!username || !phoneNumber || !type || !place || !dob || !time) {
            return new Response(
                JSON.stringify({ error: "Missing required fields" }),
                { status: 400 }
            );
        }

        const { data: dataInsert, error: errorInsert } = await supabase
            .from("forms")
            .insert({
                nama: username,
                opsi: type,
                no_telp: phoneNumber,
                tempat: place,
                tanggal: dob,
                jam: time,
            })
            .select()
            .single();

        if (errorInsert) {
            return new Response(
                JSON.stringify({
                    error: "Supabase insert error",
                    details: errorInsert,
                }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify({
                message: "Data form berhasil disimpan di Supabase",
                dataInsert,
            }),
            { status: 200 }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: "Unexpected error occurred", details: error }),
            { status: 500 }
        );
    }
}
