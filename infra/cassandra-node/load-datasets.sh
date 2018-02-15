#!/usr/bin/env bash

cqlFiles=/datasets/*
for f in $cqlFiles
do
  echo "Processing $f file..."
  cqlsh -f "$f"
done