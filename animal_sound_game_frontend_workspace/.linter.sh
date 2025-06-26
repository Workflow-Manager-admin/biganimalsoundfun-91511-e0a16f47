#!/bin/bash
cd /home/kavia/workspace/code-generation/biganimalsoundfun-91511-e0a16f47/animal_sound_game_frontend_workspace/animal_sound_game_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

