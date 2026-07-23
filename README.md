# test8

---

## PowerApps Model-Driven App – Quote Management (D365 CRM)

This repository includes a Dataverse / D365 CRM **solution package** that creates
a model-driven app with the standard **Quote** table, surfacing its default
**Main Form** and **Default View (Active Quotes)**.

### Solution structure

```
solution/
├── [Content_Types].xml   ← required by the Dataverse importer
├── solution.xml          ← solution manifest (publisher, version, components)
└── customizations.xml    ← App Module + Site Map definitions

scripts/
├── pack-solution.sh      ← Linux / macOS: creates QuoteModelDrivenApp.zip
└── pack-solution.ps1     ← Windows PowerShell: creates QuoteModelDrivenApp.zip
```

### Pack the solution

**Linux / macOS**

```bash
chmod +x scripts/pack-solution.sh
./scripts/pack-solution.sh
```

**Windows (PowerShell)**

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\pack-solution.ps1
```

Both scripts produce `QuoteModelDrivenApp.zip` in the repository root.

### Import into D365 CRM / Dataverse

1. Go to <https://make.powerapps.com> and select the target **environment**.
2. Open **Solutions** → **Import solution**.
3. Upload `QuoteModelDrivenApp.zip` and follow the wizard.
4. After the import completes, select the solution and click
   **Publish all customizations**.
5. The **Quote Management** app will appear in the app switcher and in the
   D365 navigation bar for every user who has at least *Read* access to the
   Quote entity through their security role.

### What the solution contains

| Component | Details |
|-----------|---------|
| **Solution** | `QuoteModelDrivenApp` v1.0.0.0 (unmanaged) |
| **Publisher** | AgusTOC Publisher – prefix `agustoc` |
| **App Module** | `agustoc_QuoteManagementApp` – Unified Interface, SiteMap navigation |
| **Site Map** | `agustoc_QuoteManagementApp_sitemap` – single *Quotes* area → *Quotes* group → Quote sub-area |
| **Table** | Standard `quote` entity (ObjectTypeCode 1084) – default Main Form + Active Quotes view |

### Customising forms and views

By default the app uses the entity's **default main form** and **default view**
for the Quote table.  To pin specific forms or views, add their GUIDs as
`AppModuleComponent` entries inside `customizations.xml`:

```xml
<!-- Main Form (get GUID from maker portal: Tables → Quote → Forms) -->
<AppModuleComponent type="60" objectId="{YOUR-FORM-GUID}" behavior="0" />

<!-- View (get GUID from maker portal: Tables → Quote → Views) -->
<AppModuleComponent type="26" objectId="{YOUR-VIEW-GUID}" behavior="0" />
```

Then re-pack and re-import the solution.

### Making it managed (production deployment)

Change `<Managed>0</Managed>` to `<Managed>1</Managed>` in `solution.xml`
before packing to produce a **managed solution** that cannot be edited in the
target environment (recommended for production).

---

## Web storefront (existing files)

`index.html`, `script.js`, `style.css` — static e-commerce demo page (TokoKita).