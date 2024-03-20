# Guidelines

### Directory structuring in App

- Specific page's internal components will be located inside /page-name/comps/
- Internal components must be import by absolute path "./comps/\*.tsx" instead of relative path like "\_@landing/\*\*"
- Internal providers and hooks should be located the same as above
  => Import sorter can group components by internal use and shared use
- Share components should be classified to internal App share or cross apps share. Cross app shared material will be in @shared package
