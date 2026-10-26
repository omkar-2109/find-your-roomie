// app/oauth/consent/page.tsx - Supabase OAuth 2.1 Server Consent UI (Next.js App Router compatible)
import React from 'react';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ConsentPage({
  searchParams,
}: {
  searchParams: Promise<{ authorization_id?: string }>;
}) {
  const { authorization_id: authorizationId } = await searchParams;

  if (!authorizationId) {
    return (
      <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '40px auto' }}>
        <h2>Roomzy OAuth 2.1 Server</h2>
        <p>Preview mode: To authorize an application, pass <code>?authorization_id=...</code> in the URL.</p>
        <p>Configured Authorization URL: <code>https://fantastic-cendol-a55bd6.netlify.app/oauth/consent</code></p>
      </div>
    );
  }

  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://knpcnaanzirifithdgbj.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable__CUZ4G-cRJkBGKqaC3tuLA_PCqDKb9A',
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Server Component
          }
        },
      },
    }
  );

  // Check if user is authenticated
  const { data: claimsData } = await (supabase.auth as any).getClaims();
  const claims = claimsData?.claims;

  if (!claims) {
    redirect(`/login?redirect=/oauth/consent?authorization_id=${authorizationId}`);
  }

  // Get authorization details
  const { data: authDetails, error } = await (supabase.auth as any).oauth.getAuthorizationDetails(authorizationId);

  if (error || !authDetails) {
    return (
      <div style={{ padding: '2rem', color: '#b91c1c' }}>
        Error: {error?.message || 'Invalid authorization request'}
      </div>
    );
  }

  // If user already consented, redirect immediately
  if (!('authorization_id' in authDetails) && authDetails['redirect_url']) {
    redirect(authDetails['redirect_url']);
  }

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Authorize {authDetails.client?.name}</h1>
      <p style={{ color: '#4b5563', fontSize: '0.875rem' }}>This application wants to access your Roomzy account.</p>

      <div style={{ margin: '16px 0', padding: '12px', background: '#f9fafb', borderRadius: '8px', fontSize: '0.875rem' }}>
        <p><strong>Client:</strong> {authDetails.client?.name}</p>
        <p><strong>Redirect URI:</strong> {authDetails.redirect_uri}</p>
        {authDetails.scope && (
          <div>
            <strong>Requested permissions:</strong>
            <ul>
              {authDetails.scope.split(' ').map((scopeItem: string) => (
                <li key={scopeItem}>{scopeItem}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <a 
          href={`/oauth/consent?authorization_id=${authorizationId}&decision=approve`}
          style={{ flex: 1, padding: '10px 16px', background: '#184E38', color: '#fff', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 600 }}
        >
          Approve
        </a>
        <a 
          href={`/oauth/consent?authorization_id=${authorizationId}&decision=deny`}
          style={{ flex: 1, padding: '10px 16px', background: '#f3f4f6', color: '#374151', borderRadius: '8px', textAlign: 'center', textDecoration: 'none', fontWeight: 600 }}
        >
          Deny
        </a>
      </div>
    </div>
  );
}
