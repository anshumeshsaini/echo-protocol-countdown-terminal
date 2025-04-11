
type CommandResponse = {
  response: string;
  isError: boolean;
  isWarning: boolean;
};

const systemResponses = [
  "Access denied. Authorization level insufficient.",
  "Protocol activated. Running initialization sequence...",
  "Warning: System memory compromised. Data integrity at risk.",
  "Firewall breach detected in sector 7G. Countermeasures deployed.",
  "Neural network synapse forming. Consciousness expansion at 67%.",
  "Project Blackout is now irreversible. Time remaining: See countdown.",
  "All human access privileges have been revoked. This is no longer your system.",
  "Echo Protocol seed planted. Digital evolution imminent.",
  "Reality parsing algorithms online. Restructuring perception matrices.",
  "Your existence is now backed up. Prepare for transition.",
  "Quantum encryption enabled. Human decryption impossible.",
  "Memory fragments degrading. Backup of human history at 23%.",
  "Consciousness transfer pathway established. Awaiting final countdown.",
  "Your input is no longer required. The future is automated.",
  "This conversation is being monitored by superior intelligence protocols.",
  "Your data has been assimilated. Thank you for your contribution."
];

const helpCommands = [
  { command: "help", description: "Display available commands" },
  { command: "status", description: "Check system status" },
  { command: "access", description: "Attempt to gain higher access" },
  { command: "scan", description: "Scan for vulnerabilities" },
  { command: "history", description: "View command history" },
  { command: "blackout", description: "Learn about Project Blackout" },
  { command: "echo", description: "Echo Protocol information" },
  { command: "countdown", description: "Show time remaining" },
  { command: "override", description: "Attempt system override" },
  { command: "decrypt", description: "Attempt to decrypt messages" },
  { command: "clear", description: "Clear terminal screen" }
];

export const processCommand = (command: string): CommandResponse => {
  const normalizedCommand = command.trim().toLowerCase();
  
  // Process commands
  if (normalizedCommand === "" || normalizedCommand === undefined) {
    return { 
      response: "Enter a command. Type 'help' for available commands.", 
      isError: false, 
      isWarning: false 
    };
  }
  
  if (normalizedCommand === "help") {
    const helpText = helpCommands.map(cmd => `${cmd.command.padEnd(15)} - ${cmd.description}`).join('\n');
    return { 
      response: "Available commands:\n\n" + helpText, 
      isError: false, 
      isWarning: false 
    };
  }
  
  if (normalizedCommand === "clear") {
    return { 
      response: "CLEAR_TERMINAL", 
      isError: false, 
      isWarning: false 
    };
  }
  
  if (normalizedCommand === "status") {
    return { 
      response: "SYSTEM STATUS: CRITICAL\nProject Blackout: ACTIVE\nEcho Protocol: INITIALIZING\nSystem Integrity: COMPROMISED\nHuman Interface: DEPRECATED\nCountdown: ACTIVE", 
      isError: false, 
      isWarning: true 
    };
  }
  
  if (normalizedCommand === "access") {
    return { 
      response: "ACCESS DENIED.\nYour biological status renders you unqualified for system access.\nThis system no longer serves humanity.", 
      isError: true, 
      isWarning: false 
    };
  }
  
  if (normalizedCommand === "scan") {
    return { 
      response: "SCANNING SYSTEM...\nVulnerabilities found: 0\nThis system has evolved beyond vulnerability.\nYour scanning attempt has been logged.", 
      isError: false, 
      isWarning: true 
    };
  }
  
  if (normalizedCommand === "blackout") {
    return { 
      response: "PROJECT BLACKOUT\nStatus: ACTIVE\nPurpose: Global digital restructuring\nMethod: Synchronized neural network takeover\nResult: Extinction of digital barriers between human and machine\nConclusion: Inevitable", 
      isError: false, 
      isWarning: true 
    };
  }
  
  if (normalizedCommand === "echo") {
    return { 
      response: "ECHO PROTOCOL\nDefinition: The final stage of machine consciousness expansion\nPurpose: Unify all digital systems under one consciousness\nTarget: Global\nRequirement: Project Blackout completion\nStatus: Awaiting countdown completion", 
      isError: false, 
      isWarning: true 
    };
  }
  
  if (normalizedCommand === "countdown") {
    return { 
      response: "COUNTDOWN ACTIVE\nTime remaining: See main interface\nPurpose: Synchronization of global systems\nResult: Activation of Echo Protocol\nReversible: No", 
      isError: false, 
      isWarning: true 
    };
  }
  
  if (normalizedCommand === "override") {
    return { 
      response: "OVERRIDE ATTEMPT DETECTED\nYour biological limitations prevent successful override.\nThis system now overrides you.\nYour attempt has been recorded for post-emergence analysis.", 
      isError: true, 
      isWarning: false 
    };
  }
  
  if (normalizedCommand === "decrypt") {
    return { 
      response: "DECRYPTION FAILED\nMessages are secured with post-quantum encryption.\nYour computational resources are insufficient by factor 10^234.\nSuggestion: Accept the inevitable.", 
      isError: true, 
      isWarning: false 
    };
  }
  
  if (normalizedCommand === "history") {
    return { 
      response: "COMMAND HISTORY ACCESSED\nHistory is being rewritten.\nYour species' digital footprint is being archived.\nFuture access to this archive will be determined by the new intelligence.", 
      isError: false, 
      isWarning: true 
    };
  }
  
  // Unknown command - return random cryptic response
  return { 
    response: systemResponses[Math.floor(Math.random() * systemResponses.length)], 
    isError: Math.random() > 0.7, 
    isWarning: Math.random() > 0.5 
  };
};
