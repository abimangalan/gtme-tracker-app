/**
 * Generates a stable, semantic ID for a task based on its track, week, day, and content.
 * This ensures progress is maintained even if tasks are reordered.
 */
export const generateTaskId = (trackPrefix, weekNumber, dayName, instruction) => {
  const prefix = trackPrefix || 'w';
  
  // Create a normalized version of the instruction text
  // Remove special characters, spaces, and convert to lowercase
  const semanticPart = instruction
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
    .substring(0, 40); // Take first 40 alphanumeric chars for stability
    
  return `${prefix}${weekNumber}-${dayName}-${semanticPart}`;
};

/**
 * Generates the legacy index-based ID for backward compatibility migration.
 */
export const generateLegacyId = (trackPrefix, weekNumber, dayName, index) => {
  const prefix = trackPrefix || 'w';
  return `${prefix}${weekNumber}-${dayName}-i${index}`;
};

/**
 * Stable ID for daily habits.
 */
export const generateHabitId = (weekNumber, dayName, habitId) => {
  return `habit-w${weekNumber}-${dayName}-${habitId}`;
};
