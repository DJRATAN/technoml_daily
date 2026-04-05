const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testDelete() {
  console.log('Fetching first link...');
  const { data: links } = await supabase.from('links').select('*').limit(1);
  if (!links || links.length === 0) return;

  const link = links[0];
  console.log('Attempting to delete link:', link.id);
  
  const { error: deleteError, count } = await supabase
    .from('links')
    .delete({ count: 'exact' })
    .eq('id', link.id);

  if (deleteError) {
    console.error('Delete error:', deleteError);
  } else {
    console.log('Delete reported success. Rows affected:', count);
    
    if (count > 0) {
        console.log('Re-inserting link to restore state...');
        await supabase.from('links').insert([{
            id: link.id,
            title: link.title,
            url: link.url,
            category_id: link.category_id,
            icon: link.icon,
            custom_icon: link.custom_icon
        }]);
        console.log('Restored.');
    }
  }
}

testDelete();
