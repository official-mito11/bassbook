import type { GlobalValue } from "./value";

export type LengthUnit = 
  // Absolute Length Units
  "px" | "cm" | "mm" | "in" | "pt" | "pc" | "Q" |

  // Font Relative Units
  "em" | "rem" | "ex" | "ch" | "cap" | "ic" | "lh" | "rlh" |

  // Viewport Relative Units
  "vw" | "vh" | "vmin" | "vmax" |

  // Dynamic/Small/Large/Block/Inline
  "dvw" | "dvh" | "svw" | "svh" | "lvw" | "lvh" |
  "vb" | "vi" | "dvb" | "dvi" | "svb" | "svi" | "lvb" | "lvi" | 
  
  // Container Query Units
  "cqw" | "cqh" | "cqi" | "cqb" | "cqmin" | "cqmax" |

  // Grid Track Size
  "fr" |

  // Percentage
  "%";

export type LengthAlias = 
  "full" | "half" | "quarter";

export type RawLength = `${number}${LengthUnit}`;

export type Length = RawLength | number | LengthAlias | GlobalValue;

export type RawLengthValue = RawLength | GlobalValue;