#!/usr/bin/env bash
# pack-solution.sh
# ─────────────────────────────────────────────────────────────────────────────
# Packs the three solution files into a zip that can be imported directly into
# Dataverse / D365 CRM via:
#   make.powerapps.com → Solutions → Import Solution
#
# Requirements: zip (install with "apt install zip" or "brew install zip")
# ─────────────────────────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
SOLUTION_DIR="${REPO_ROOT}/solution"
OUTPUT_FILE="${REPO_ROOT}/QuoteModelDrivenApp.zip"

echo "Packing solution from: ${SOLUTION_DIR}"

# Remove old zip if present
rm -f "${OUTPUT_FILE}"

# Create the zip with the three required files at the root of the archive
(
  cd "${SOLUTION_DIR}"
  zip -r "${OUTPUT_FILE}" \
    "[Content_Types].xml" \
    "solution.xml" \
    "customizations.xml"
)

echo "Done → ${OUTPUT_FILE}"
echo ""
echo "Import steps:"
echo "  1. Go to https://make.powerapps.com and select your environment."
echo "  2. Navigate to Solutions → Import solution."
echo "  3. Upload QuoteModelDrivenApp.zip and follow the wizard."
echo "  4. After import, select the solution and click Publish all customizations."
echo "  5. The 'Quote Management' app will appear in the app list / D365 nav bar."
