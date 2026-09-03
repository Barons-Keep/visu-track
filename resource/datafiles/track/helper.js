#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const inputFile = process.argv[2];

if (!inputFile) {
  console.error("Usage: node app.js <file.json>");
  process.exit(1);
}

function rm_em(inputFile) {
  const track = JSON.parse(fs.readFileSync(inputFile, "utf8"));
  fs.copyFileSync(inputFile, `${inputFile}.old`)
  track.data.channels
    .forEach(channel => channel.events
      .forEach(event => {
        if (event.data["en-shr_use-em" === false]) {
          event["en-shr_em-cfg"] = {}
        }
      }))

  const backupFile = inputFile;

  fs.writeFileSync(
    backupFile,
    JSON.stringify(track, null, 2) + "\n",
    "utf8"
  );

  console.log(`Saved: ${backupFile}`);
}

function shroom_onDeath_onDamage(inputFile) {
  const shrooms = JSON.parse(fs.readFileSync(inputFile, "utf8"));
  Object.entries(shrooms.data).filter(([key, value]) => {
    const onDamage = value["onDamage"]
    const onDeath = value["onDeath"]
    if (Array.isArray(onDamage) && onDamage.length > 3) {
      console.log(inputFile, "\n ", key, "onDamage", onDamage.length)
    }
    if (Array.isArray(onDeath) && onDeath.length > 3) {
      console.log(inputFile, "\n ", key, "onDeath", onDeath.length)
    }
  })
}

try {
  shroom_onDeath_onDamage(inputFile)
} catch (error) {
  console.error(`Error: ${error.message}`);
  process.exit(1);
}
