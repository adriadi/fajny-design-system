# B-048 · Closing the two stale questions

Acknowledged, both closed: B-041 Q2 (per-field errors only, no banner) and B-038 (Medium badge stays the dark `fds-tag fds-surface-dark` pill). No code touched.

One detail to be aware of: the contact form still has a single server-failure line (`<p className="form-error" role="alert">`) for when `contact.php` can't send. It is not a validation banner, and per-field errors are separate. If "no banner" should include that line too, send a brief. Otherwise it stays.
