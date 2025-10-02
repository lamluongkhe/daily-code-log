#!/bin/bash


while read r;
do
echo "$r" | cut -c 1-4
done