// WCAG 2.2 criteria definitions grouped by principles
export const wcagCriteria = [
  // Perceivable - Information and user interface components must be presentable to users in ways they can perceive
  {
    id: "1.1.1", 
    name: "Non-text Content", 
    level: "A",
    principle: "Perceivable",
    description: "All non-text content that is presented to the user has a text alternative that serves the equivalent purpose."
  },
  {
    id: "1.2.1", 
    name: "Audio-only and Video-only (Prerecorded)", 
    level: "A",
    principle: "Perceivable",
    description: "For prerecorded audio-only and prerecorded video-only media, alternatives are provided."
  },
  {
    id: "1.3.1", 
    name: "Info and Relationships", 
    level: "A",
    principle: "Perceivable",
    description: "Information, structure, and relationships conveyed through presentation can be programmatically determined."
  },
  {
    id: "1.4.1", 
    name: "Use of Color", 
    level: "A",
    principle: "Perceivable",
    description: "Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element."
  },
  {
    id: "1.4.3", 
    name: "Contrast (Minimum)", 
    level: "AA",
    principle: "Perceivable",
    description: "The visual presentation of text and images of text has a contrast ratio of at least 4.5:1."
  },
  {
    id: "1.4.4", 
    name: "Resize Text", 
    level: "AA",
    principle: "Perceivable",
    description: "Text can be resized without assistive technology up to 200 percent without loss of content or functionality."
  },
  
  // Operable - User interface components and navigation must be operable
  {
    id: "2.1.1", 
    name: "Keyboard", 
    level: "A",
    principle: "Operable",
    description: "All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes."
  },
  {
    id: "2.2.1", 
    name: "Timing Adjustable", 
    level: "A",
    principle: "Operable",
    description: "For each time limit that is set by the content, users can extend, adjust, or disable the time limit."
  },
  {
    id: "2.3.1", 
    name: "Three Flashes or Below Threshold", 
    level: "A",
    principle: "Operable",
    description: "Web pages do not contain anything that flashes more than three times in any one second period."
  },
  {
    id: "2.4.1", 
    name: "Bypass Blocks", 
    level: "A",
    principle: "Operable",
    description: "A mechanism is available to bypass blocks of content that are repeated on multiple Web pages."
  },
  {
    id: "2.4.2", 
    name: "Page Titled", 
    level: "A",
    principle: "Operable",
    description: "Web pages have titles that describe topic or purpose."
  },
  {
    id: "2.4.3", 
    name: "Focus Order", 
    level: "A",
    principle: "Operable",
    description: "If a Web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability."
  },
  {
    id: "2.4.4", 
    name: "Link Purpose (In Context)", 
    level: "A",
    principle: "Operable",
    description: "The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context."
  },
  {
    id: "2.4.7", 
    name: "Focus Visible", 
    level: "AA",
    principle: "Operable",
    description: "Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible."
  },
  {
    id: "2.4.11", 
    name: "Focus Not Obscured (Minimum)", 
    level: "AA",
    principle: "Operable",
    description: "When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content."
  },
  {
    id: "2.4.12", 
    name: "Focus Not Obscured (Enhanced)", 
    level: "AAA",
    principle: "Operable",
    description: "When a user interface component receives keyboard focus, no part of the component is hidden by author-created content."
  },
  {
    id: "2.4.13", 
    name: "Focus Appearance", 
    level: "AAA",
    principle: "Operable",
    description: "When a user interface component receives keyboard focus, the focus indication meets enhanced contrast and size requirements."
  },
  {
    id: "2.5.7", 
    name: "Dragging Movements", 
    level: "AA",
    principle: "Operable",
    description: "All functionality that uses a dragging movement can be operated by a single pointer without dragging."
  },
  {
    id: "2.5.8", 
    name: "Target Size (Minimum)", 
    level: "AA",
    principle: "Operable",
    description: "The size of the target for pointer inputs is at least 24 by 24 CSS pixels."
  },
  
  // Understandable - Information and the operation of user interface must be understandable
  {
    id: "3.1.1", 
    name: "Language of Page", 
    level: "A",
    principle: "Understandable",
    description: "The default human language of each Web page can be programmatically determined."
  },
  {
    id: "3.2.1", 
    name: "On Focus", 
    level: "A",
    principle: "Understandable",
    description: "When any user interface component receives focus, it does not initiate a change of context."
  },
  {
    id: "3.2.6", 
    name: "Consistent Help", 
    level: "A",
    principle: "Understandable",
    description: "If a web page contains help mechanisms, these are presented consistently."
  },
  {
    id: "3.3.1", 
    name: "Error Identification", 
    level: "A",
    principle: "Understandable",
    description: "If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text."
  },
  {
    id: "3.3.7", 
    name: "Redundant Entry", 
    level: "A",
    principle: "Understandable",
    description: "Information previously entered by the user is auto-populated or available for the user to select."
  },
  {
    id: "3.3.8", 
    name: "Accessible Authentication (Minimum)", 
    level: "AA",
    principle: "Understandable",
    description: "If authentication requires cognitive function test, alternative authentication method is available."
  },
  {
    id: "3.3.9", 
    name: "Accessible Authentication (Enhanced)", 
    level: "AAA",
    principle: "Understandable",
    description: "Authentication does not rely on cognitive function tests."
  },
  
  // Robust - Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies
  {
    id: "4.1.2", 
    name: "Name, Role, Value", 
    level: "A",
    principle: "Robust",
    description: "For all user interface components, the name and role can be programmatically determined; states, properties, and values can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies."
  }
];
