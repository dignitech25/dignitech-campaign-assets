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
- Boundary purple: `#7353ba`, three-pixel outer frame and section dividers.
- Soft lavender: `#eee2ff`, section labels and preference panel.
- White: `#ffffff`, reading panels and high-contrast text on navy.
- Ink: `#111111`, body copy.

The boundary colour is a named token, not an isolated hard-coded choice. Future
campaign variants may change the accent and panel colours after owner review while
retaining the same structural and accessibility checks.

Preference links sit on the lavender panel rather than the navy footer because some
email clients override link colours. The separation preserves readable contrast.
