import { AwsClient } from "aws4fetch";

export default {
  async fetch(req, env) {
    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "https://aaron-feingold.com",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
    };

    // Handle OPTIONS request
    if (req.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Initialize AWS client with R2 credentials
      const r2 = new AwsClient({
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
        region: "auto", // R2 uses 'auto' as region
        service: "s3", // R2 is S3-compatible
        signatureVersion: "v4", // Ensure SigV4 is used
      });

      // Construct the URL for your resume
      const url = new URL(
        `https://${env.R2_BUCKET_NAME}.${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${env.RESUME_NAME}`
      );

      // Set expiration time (1 hour)
      url.searchParams.set("X-Amz-Expires", "3600");

      // Generate signed request
      const signed = await r2.sign(
        new Request(url, {
          method: "GET",
        }),
        {
          aws: {
            signQuery: true, // This makes it a presigned URL
          },
        }
      );

      return new Response(JSON.stringify({ url: signed.url }), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error generating signed URL:", error);
      return new Response(
        JSON.stringify({
          error: `Failed to generate signed URL: ${error.message}`,
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }
  },
};
