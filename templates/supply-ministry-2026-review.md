# Supply Ministry derived engagement layout

Status: review candidate, not a newly owner-approved master.
Source checked: 21 October 2026.

## Actual provenance

This layout is externally generated HTML derived from a real sent Supply Ministry
email. It is not a clone of a saved Zoho drag-and-drop template and must not be
described as one.

The source is the sent campaign **OneStopShop**, 5 May 2026, campaign ID
`37824000000791002`, retrieved through Zoho Campaigns by the coordinating agent.
Its public preview was independently fetched as HTML and returned HTTP 200:

https://sqvguv-hgf.maillist-manage.com.au/campaigns/SharedCampaignPreview.zc?c=html&cDgs=3z5f4a2e5142f72c3272fe31c5a39636b5720dd6cb8ca9ad8d212b0fdf8a9408c5

The actual logo asset is retained without replacement or redrawing:

https://stratus.campaign-image.com.au/images/37824000000791004_zc_v1_1777946397668_sm___inverted_(1).png

## Preserved identity

- Supply Ministry's 570-pixel inverted logo inside a 600-pixel email shell.
- Purple header `#3d2d9e`, white body, sand panels `#f4efe6` and navy CTA `#1c1c75`.
- The source's sign-off: Best regards, Alex and David.
- David 0404 593 090 and Alex 0452 002 450, with their Supply Ministry email addresses.
- Zoho first-name, unsubscribe and subscription-preference merge fields.

The new layout is responsive external HTML, using presentation tables, inline
styles and mobile overrides. Paragraphs and the action section are generated from
the three Supply Ministry engagement specifications. It has no Sleep Choice skin,
Forté partner block or event details.

The old source's pale-grey preference links have been replaced with dark,
underlined text on sand. This is an explicit readability improvement, not a claim
that the original source already met that standard.

## Build and source checks

Run `node scripts/render-supply-engagement.mjs`. The script renders only the
three `supply-ministry-review` specifications in
`campaigns/ot-engagement-2026-10/` and checks required identity fields, merge fields,
basic layout structure and absence of the other brand or partner assets.

Source checks are not rendered desktop/mobile acceptance or a live Zoho-stored
preview check. The renderer does not send, schedule, create or modify campaigns.

## Outstanding acceptance

The supplied source did not establish a verified public business postal address.
No placeholder or private address has been added. Postal-address confirmation,
owner acceptance of the derived layout, desktop/mobile visual inspection, live
Zoho-stored preview validation and current audience/consent/suppression checks
remain required before any campaign is described as send-ready.

The historical source's funding and clinical claims have not been copied into the
new communications. No outcome, stock, compatibility, funding or delivery promise
is created by this layout.
