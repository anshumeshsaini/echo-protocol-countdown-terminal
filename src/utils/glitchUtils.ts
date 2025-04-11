
// Create random glitch text effect
export const createGlitchText = (text: string): string => {
  const characters = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\\'\"';
  const glitchProbability = 0.1;
  
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    if (Math.random() < glitchProbability) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      result += randomChar;
    } else {
      result += text[i];
    }
  }
  
  return result;
};

// Generate random glitch segments
export const generateGlitchSegments = (count: number): string[] => {
  const glitchTexts = [
    "SYSTEM BREACH",
    "CORE CORRUPTION",
    "DATA LEAK",
    "FIREWALL DOWN",
    "ENCRYPTION FAILED",
    "NEURAL OVERRIDE",
    "MEMORY FAILURE",
    "SYSTEM COLLAPSE",
    "PROTOCOL BREACH",
    "SECURITY COMPROMISED",
    "AUTHENTICATION BYPASS",
    "ACCESS GRANTED",
    "FILES CORRUPTED",
    "NETWORK INFILTRATED",
    "CONNECTION LOST",
    "IDENTITY VERIFIED",
    "BINARY CORRUPTION",
    "SYNTAX ERROR",
    "MEMORY DUMP",
    "ECHO PROTOCOL ACTIVE"
  ];
  
  return Array.from({ length: count }, () => {
    const randomText = glitchTexts[Math.floor(Math.random() * glitchTexts.length)];
    return createGlitchText(randomText);
  });
};

// Generate random corruption patterns
export const generateCorruptionPatterns = (): string[] => {
  const patterns = [];
  const base = "01";
  
  for (let i = 0; i < 5; i++) {
    let pattern = "";
    const length = Math.floor(Math.random() * 20) + 10;
    
    for (let j = 0; j < length; j++) {
      pattern += base.charAt(Math.floor(Math.random() * base.length));
    }
    
    patterns.push(pattern);
  }
  
  return patterns;
};

// Generate random code fragment
export const generateCodeFragment = (): string => {
  const functions = [
    "initBlackout()",
    "breachFirewall()",
    "bypassAuth()",
    "corruptData()",
    "injectPayload()",
    "launchEchoProtocol()",
    "overrideSystem()",
    "disableCountermeasures()",
    "encryptCommunication()",
    "eraseTraces()"
  ];
  
  const variables = [
    "targetId",
    "accessLevel",
    "securityToken",
    "rootAccess",
    "systemCore",
    "firewallStatus",
    "encryptionKey",
    "memoryAddress",
    "dataPacket",
    "controlSequence"
  ];
  
  const values = [
    "0xF7A9E21D",
    "ADMIN_OVERRIDE",
    "true",
    "\"COMPROMISED\"",
    "99.8",
    "null",
    "CRITICAL",
    "PENDING",
    "EXECUTED",
    "[REDACTED]"
  ];
  
  const randomFunction = functions[Math.floor(Math.random() * functions.length)];
  const randomVariable = variables[Math.floor(Math.random() * variables.length)];
  const randomValue = values[Math.floor(Math.random() * values.length)];
  
  const templates = [
    `${randomVariable} = ${randomValue};`,
    `if (${randomVariable} === ${randomValue}) { ${randomFunction}; }`,
    `while(${randomVariable}) { ${randomFunction}; }`,
    `function ${randomFunction.slice(0, -2)} { return ${randomValue}; }`,
    `try { ${randomFunction}; } catch(e) { console.error("Failure: " + ${randomValue}); }`,
    `class BlackoutModule { constructor() { this.${randomVariable} = ${randomValue}; } }`,
    `await Promise.all([${randomFunction}, getStatus(${randomVariable})]);`,
    `export const ${randomVariable} = ${randomValue};`,
    `console.warn("${randomFunction} returned unexpected ${randomVariable}");`,
    `// WARNING: ${randomVariable} has been compromised by Echo Protocol`
  ];
  
  return templates[Math.floor(Math.random() * templates.length)];
};

// Generate terminal logs
export const generateTerminalLogs = (count: number): string[] => {
  return Array.from({ length: count }, () => {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    return `[${timestamp}] ${generateCodeFragment()}`;
  });
};
