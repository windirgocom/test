// /functions/api/config.js
export async function onRequest(context) {
  const { env } = context;
  
  try {
    // Get environment variables from Cloudflare Pages
    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_ANON_KEY;
    
    // Validate that environment variables exist
    if (!supabaseUrl || !supabaseKey) {
      return new Response(
        JSON.stringify({ 
          error: 'Configuration not found',
          message: 'Please set SUPABASE_URL and SUPABASE_ANON_KEY in Cloudflare Pages environment variables'
        }), 
        { 
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      );
    }
    
    // Return the configuration
    return new Response(
      JSON.stringify({
        supabaseUrl,
        supabaseKey
      }), 
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    );
    
  } catch (error) {
    console.error('Error in config function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}
