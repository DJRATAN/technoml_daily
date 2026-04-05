// require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testUpdate() {
  console.log('Fetching first link...');
  const { data: links, error: fetchError } = await supabase.from('links').select('*').limit(1);
  if (fetchError || !links || links.length === 0) {
    console.error('Fetch error:', fetchError);
    return;
  }

  const link = links[0];
  console.log('Updating link:', link.id, 'with current title:', link.title);
  
  const originalTitle = link.title;
  const newTitle = originalTitle + ' (Updated Test)';
  
  const { error: updateError, count } = await supabase
    .from('links')
    .update({ title: newTitle }, { count: 'exact' })
    .eq('id', link.id);

  if (updateError) {
    console.error('Update error:', updateError);
  } else {
    console.log('Update reported success. Rows affected:', count);
    console.log('Re-checking from database...');
    const { data: updatedLinks } = await supabase.from('links').select('*').eq('id', link.id).single();
    console.log('New title:', updatedLinks.title);
    
    // Revert back or keep it updated for now? Let's revert.
    await supabase.from('links').update({ title: originalTitle }).eq('id', link.id);
    console.log('Reverted back to original title.');
  }
}

testUpdate();
