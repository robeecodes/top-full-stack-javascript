#!/bin/bash

# Create output directories
mkdir -p output/800x600 output/400x300 output/200x150

# Convert JPG and PNG to AVIF and resize
for file in *.jpg *.png; do
  if [ -f "$file" ]; then
    # Convert to AVIF
    avifenc --speed 2 "$file" "${file%.*}.avif"
    
    # Check if the conversion was successful
    if [ $? -eq 0 ]; then
      # Resize the converted AVIF file
      convert "${file%.*}.avif" -resize 800x600 "output/800x600/${file%.*}.avif"
      convert "${file%.*}.avif" -resize 400x300 "output/400x300/${file%.*}.avif"
      convert "${file%.*}.avif" -resize 200x150 "output/200x150/${file%.*}.avif"
      
      # Delete the original file
      rm "$file"
    else
      echo "Conversion failed for $file"
    fi
  fi
done

