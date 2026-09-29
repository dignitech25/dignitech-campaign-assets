# Sleep Choice 0926 email master

Status: approved source extraction pending owner visual acceptance

Source campaign: `BLANK SC CAMPAIGN`

Source campaign ID: `37824000001363007`

The master uses:

- the exact Sleep Choice transparent logo asset extracted from the Zoho campaign;
- the approved Sleep Choice colours and 600 pixel email width;
- the branded David and Alex footer from the source campaign;
- the source campaign's unsubscribe and preference merge tags;
- email-safe tables and inline styles;
- structured body slots rendered from campaign JSON.

The renderer is an external HTML master. It is not a Zoho drag-and-drop template
clone and must never be described as one.

## Design tokens

- Deep navy: `#2c2758`, brand header, footer and primary action.
- Boundary purple: `#7353ba`, two-pixel section dividers.
- Soft lavender: `#eee2ff`, section labels and preference panel.
- White: `#ffffff`, reading panels and high-contrast text on navy.
- Ink: `#111111`, body copy.

The template uses continuous 26-pixel navy rails rather than a separate outer outline.
Every content and action panel shares the same straight edge. The boundary colour is
a named token, not an isolated hard-coded choice. Future
campaign variants may change the accent and panel colours after owner review while
retaining the same structural and accessibility checks.

Preference links sit on the lavender panel rather than the navy footer because some
email clients override link colours. The separation preserves readable contrast.

## Forté event variant

The Forté training campaign uses a secondary partner configuration derived from the
current Forté Healthcare website and the supplied logo asset:

- Forté blue: `#366382`;
- Forté dark blue: `#244a67`;
- Forté light ground: `#f5f7f9`;

Sleep Choice remains the masthead owner and controls the CTA. Forté appears in a
smaller `Presented with` lockup. Forté blue is restricted to the partner lockup and
clinical heading. Sleep Choice lavender and purple continue to define the content,
event and action panels. The supplied Forté logo is stored at
`assets/forte/forte-logo.png`.
