#!/bin/bash

# Define a mapping of file paths to sources
declare -A files_and_sources=(
    ["../scrapy_output/anr.json"]="ANR"
    ["../scrapy_output/cnpq.json"]="CNPq"
    ["../scrapy_output/daad.json"]="DAAD"
    ["../scrapy_output/msca.json"]="MSCA"
    ["../scrapy_output/ukri.json"]="UKRI"
    ["../scrapy_output/finep.json"]="FINEP"
    ["../scrapy_output/faperj.json"]="FAPERJ"
    ["../scrapy_output/fapesp.json"]="FAPESP"
    ["../scrapy_output/erasmus.json"]="Erasmus+"
    ["../scrapy_output/euraexx.json"]="Euraexx"
)

# Loop through the mapping and run the command
for file_path in "${!files_and_sources[@]}"; do
    source=${files_and_sources[$file_path]}
    python manage.py import_scrapy_data "$file_path" --source "$source"
done
