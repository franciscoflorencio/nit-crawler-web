#!/bin/bash
set -euo pipefail

# Resolve base directory for scraped JSON files
# Priority: container mount /data/scrapy_output -> env SCRAPY_DIR -> ../scrapy_output
if [ -d "/data/scrapy_output" ]; then
  BASE_DIR="/data/scrapy_output"
elif [ -n "${SCRAPY_DIR:-}" ] && [ -d "${SCRAPY_DIR}" ]; then
  BASE_DIR="${SCRAPY_DIR}"
else
  BASE_DIR="../scrapy_output"
fi

echo "Using scraped data directory: ${BASE_DIR}"

# Declare mapping: filename -> source label
declare -A files_and_sources=(
  ["anr.json"]="ANR"
  ["cnpq.json"]="CNPq"
  ["daad.json"]="DAAD"
  ["msca.json"]="MSCA"
  ["ukri.json"]="UKRI"
  ["finep.json"]="FINEP"
  ["faperj.json"]="FAPERJ"
  ["fapesp.json"]="FAPESP"
  ["erasmus.json"]="Erasmus+"
  ["euraexx.json"]="Euraexx"
  ["eureka.json"]="Eureka"
)

for filename in "${!files_and_sources[@]}"; do
  src_label=${files_and_sources[$filename]}
  file_path="${BASE_DIR}/${filename}"
  if [ -f "${file_path}" ]; then
    echo "Importing ${filename} (source=${src_label})..."
    python manage.py import_scrapy_data "${file_path}" --source "${src_label}"
  else
    echo "Skipping ${filename}: not found at ${file_path}"
  fi
done

echo "Import process finished."
