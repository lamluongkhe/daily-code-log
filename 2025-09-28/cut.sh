#!/bin/bash


while read r;
do
echo "$r" | cut -c 2,7
done