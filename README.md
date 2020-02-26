# tabindex-loop
Creates a guarded loop of tab elements.
Ideal for managing tabbing within modals and popups.
This does not manage removing focus from the loop.
You should manually handle that depending on your use-case.

## props
| property | type | description | default value |
| --- | --- | --- | --- |
| children | string | react children provided to the tabindex-loop | null |
| className | string | custom className for the wrapper | null |
| disabled | boolean | will disable the tabloop | false |
| selector | string | the query selector value to find tabbable elements | '[tabindex], a, button, input, select, textarea, iframe, [contentEditable=true], area' |

