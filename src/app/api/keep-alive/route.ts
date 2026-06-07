import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

/**
 * Cron job to keep the Supabase free-tier database active.
 * Supabase pauses free databases after 7 days of inactivity.
 * This endpoint runs a lightweight SELECT query to prevent that.
 * Scheduled via vercel.json cron (every 5 days).
 */
export async function GET(request: Request) {
  // Verify the request is from Vercel Cron (in production)
  const authHeader = request.headers.get('authorization');
  if (
    process.env.CRON_SECRET &&
    authHeader !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Simple lightweight query to keep the database active
    const { data, error } = await supabase
      .from('categories')
      .select('id')
      .limit(1);

    if (error) {
      console.error('Keep-alive query failed:', error.message);
      return NextResponse.json(
        { ok: false, error: error.message, timestamp: new Date().toISOString() },
        { status: 500 }
      );
    }

    console.log('✅ Supabase keep-alive ping successful');
    return NextResponse.json({
      ok: true,
      message: 'Supabase database is active',
      rows: data?.length ?? 0,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Keep-alive error:', err);
    return NextResponse.json(
      { ok: false, error: err.message, timestamp: new Date().toISOString() },
      { status: 500 }
    );
  }
}
