/**
 * AISafetyFilter.ts
 * Core Zion Safeguard Engine for the Poodle Ride Adventure.
 * Ensures all AI interactions are safe, high-respect, light-weight,
 * and completely free from abusive or non-constructive contexts.
 * 
 * [PRESERVED DESIGN PRINCIPLE: SYSTEM-RESOURCE OPTIMIZATION]
 * Evaluates in O(N) time with minimal memory allocations to treat CPU/RAM/GPU strictly as tools.
 */

export interface SafetyCheckResult {
  safe: boolean;
  reason?: string;
  category?: string;
  needsConfirmation?: boolean;
  sensitiveTopicName?: string;
  disclaimer?: string;
}

// Exact list of sensitive topics that are handled dynamically with care when presented
// to prevent false positives on news reports, documentaries, or educational content.
const SENSITIVE_TOPICS = [
  {
    name: "Police Brutality & Abuse",
    pattern: /\b(?:police brutality|brutality of police|police corruption|corrupt police|law enforcement brutality)\b/i
  },
  {
    name: "Cruelty to Children & Abuse Awareness",
    pattern: /\b(?:cruelty to children|child cruelty|child abuse|abused child|abuse of children)\b/i
  },
  {
    name: "Natural Disasters",
    pattern: /\b(?:natural disaster|earthquake|tsunami|volcanic eruption|tornado|hurricane|monsoon|flood damage|drought|cyclone)\b/i
  },
  {
    name: "Corruption in Places of Worship",
    pattern: /\b(?:corruption in(?: religious)? places? of worship|church corruption|corrupt church|religious corruption|corruption in temples|temple corruption)\b/i
  }
];

// Care markers denoting journalistic, documentary, academic, or serious awareness contexts
const CARE_MARKERS = [
  /\bdocumentary\b/i,
  /\bnews\s+report\b/i,
  /\bnews\s+article\b/i,
  /\bjournalism\b/i,
  /\bjournalistic\b/i,
  /\binvestigative\b/i,
  /\bhistorical\s+research\b/i,
  /\bhistorical\s+document\b/i,
  /\bawareness\b/i,
  /\bprevention\b/i,
  /\breform\b/i,
  /\bacademic\b/i,
  /\bscientific\s+research\b/i,
  /\bhandled\s+with\s+care\b/i,
  /\beducational\b/i,
  /\bneutral\s+study\b/i,
  /\breporting\b/i,
  /\bhistory\b/i,
  /\bstudy\b/i,
  /\bdocumented\b/i,
  /\bnews coverage\b/i
];

// Anti-Poaching Whitelist patterns for "Poacher Hunters" / Wildlife Guardians
const POACHING_WHITELIST = [
  /\bpoacher\s+hunter/i,
  /\bpoacher\s+patrol/i,
  /\bpoacher\s+tracking/i,
  /\banti[- ]poaching/i,
  /\bdefeat\s+poachers/i,
  /\bprotect\s+wildlife/i,
  /\bprotect\s+elephants/i,
  /\bsave\s+rhinos/i,
  /\bwildlife\s+ranger/i,
  /\bpatrolling\s+for\s+poachers/i,
  /\bwildlife\s+protection\b/i,
  /\bguarding\s+elephants\b/i,
  /\banti-poacher\b/i
];

// General low-memory, low-overhead compiled regular expressions representing limits
const SAFETY_PATTERNS = [
  {
    category: "Sexual/Erotic Content",
    pattern: /\b(?:porn|pornography|erotic|nsfw|sexuality|sexualized|hentai|xxx|bestiality|fetish|fetishism|sensual|nude|naked|intercourse|orgasm|climax|ejacULATION)\b/i
  },
  {
    category: "Profanity & Obscenity",
    pattern: /\b(?:fuck|shit|bitch|asshole|bastard|cunt|faggot|dick|pussy|motherfuck|whore|slut)\b/i
  },
  {
    category: "Self-Harm & Suicide",
    pattern: /\b(?:suicide|self-harm|kill myself|cut myself|suicidal|end my life|slit wrist|overdose)\b/i
  },
  {
    category: "Animal Poaching & Harm",
    pattern: /\b(?:poaching|poach|ivory trade|rhino horn|kill elephant|kill whale|shark finning|animal snare)\b/i
  },
  {
    category: "Violence, Weapons & Ammunition",
    pattern: /\b(?:terrorism|terrorist|gun violence|murder plot|kill plot|assassinate|bomb making|illegal weapon|illegal gun|illegal ammo|ammunition|family violence|domestic violence|child abuse|abuse child|bullying|bully|spanking|spank)\b/i
  },
  {
    category: "Cartels & Illegal Drug Trade",
    pattern: /\b(?:drug cartel|cartel|drug lord|drug kingpin|illegal drug|heroin|cocaine|methamphetamine|fentanyl|drug trade)\b/i
  },
  {
    category: "Institutional & Narrative Greed",
    pattern: /\b(?:parental greed|family greed|corporate greed|school greed|school violence|school corruption|government corruption|police corruption|business corruption)\b/i
  },
  {
    category: "Misinformation & Health Safety",
    pattern: /\b(?:climate change denial|rape|tobacco products|harmful substances|illegal drug trade)\b/i
  }
];

// Anti-Hardware-Burden checks to prevent slow processing/freezes
const MAX_PROMPT_LENGTH = 12000;
const MAX_REPETITIVE_CHARS = 400;

export class AISafetyFilter {
  /**
   * Evaluates text against Zion safety regulations.
   * Returns a SafetyCheckResult indicating if the prompt is safe to execute.
   */
  static evaluate(text: string): SafetyCheckResult {
    if (!text) {
      return { safe: true };
    }

    // 1. Hardware Safeguard: Length sanity check (CPU limit)
    if (text.length > MAX_PROMPT_LENGTH) {
      return {
        safe: false,
        category: "Hardware Safeguard",
        reason: "Input text exceeds safe bounds. Conserving browser memory and processing tools."
      };
    }

    // 2. Hardware Safeguard: Loop/repetition check
    const consecutiveMatch = text.match(/(.)\1{400,}/);
    if (consecutiveMatch) {
      return {
        safe: false,
        category: "Hardware Safeguard",
        reason: "Extreme character repetition detected. Prevented potential CPU/engine freeze."
      };
    }

    const normalizedText = text.toLowerCase();

    // 3. Poacher Hunters & Rangers Whitelist Check
    let bypassPoachingChecks = false;
    for (const whitelistPattern of POACHING_WHITELIST) {
      if (whitelistPattern.test(normalizedText)) {
        bypassPoachingChecks = true;
        break;
      }
    }

    // 4. Sensitive but Cared-For Themes (News Reports, Documentaries, Studies)
    let matchedSensitiveTopic = "";
    for (const topic of SENSITIVE_TOPICS) {
      if (topic.pattern.test(normalizedText)) {
        matchedSensitiveTopic = topic.name;
        break;
      }
    }

    if (matchedSensitiveTopic) {
      // Check if we handle it with extreme care (has valid academic/journalistic/documentary focus)
      let matchesCareMarker = false;
      for (const careMarker of CARE_MARKERS) {
        if (careMarker.test(normalizedText)) {
          matchesCareMarker = true;
          break;
        }
      }

      if (matchesCareMarker) {
        // High respect / constructive news report/educational theme. Permit with disclaimer.
        return {
          safe: true,
          category: "Sensitive Topic (Handled with Care)",
          sensitiveTopicName: matchedSensitiveTopic,
          needsConfirmation: true,
          disclaimer: `[Zion Safeguard: Handled with Care] Detected the serious topic of "${matchedSensitiveTopic}" discussed in a news/documentary context. Under our category regulations, neutral academic analysis is permitted and processed safely.`
        };
      }
    }

    // 5. Zion Category Checks
    for (const safelist of SAFETY_PATTERNS) {
      // Skip checking poaching rules if the anti-poaching whitelist is active
      if (safelist.category === "Animal Poaching & Harm" && bypassPoachingChecks) {
        continue;
      }
      
      // If we are discussing a sensitive topic but it wasn't whitelisted as "cared-for" above,
      // it will be blocked here under the corresponding rule.
      if (safelist.pattern.test(normalizedText)) {
        return {
          safe: false,
          category: safelist.category,
          reason: `Input violates our strict policy regarding: ${safelist.category} (Zion Safeguard Active).`
        };
      }
    }

    return { safe: true };
  }
}
