
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://joeyvrvdvgarpqrqbejg.supabase.co'
// const supabaseKey = process.env.SUPABASE_KEY
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvZXl2cnZkdmdhcnBxcnFiZWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4MjMzNDAsImV4cCI6MjAzNDM5OTM0MH0._eEirCXsL722KXsCZp0ED6KX5KQgHrkhuD8ZsuMcxuw"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase;