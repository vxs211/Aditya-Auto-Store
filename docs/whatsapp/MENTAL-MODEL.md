# Mental model

Meta sends subscribed WhatsApp message events to the existing Google Apps Script, which currently looks up orders and replies. The storefront's WhatsApp buttons only open a chat.

The intended new flow must save each incoming order safely, preserve its original text, and deliver its details to Aditya Auto Orders without creating duplicate records on retries. Ambiguous details need review. None of that order intake is live yet, and the existing lookup must continue working.
