// Is page ka info content — yahan jo chahe add/edit karo.
// Fields (sab optional): hint, title, description, image, imageAlt,
// tags [{label, tone}], points [], note, link {label, href}, render () => JSX
// tone: slate | violet | emerald | amber | rose | sky

export const INFO = {
  linkName: {
    hint: "Customer ko ye naam payment page par dikhega.",
    title: "Link name",
    description:
      "Ye naam customer ko checkout page par dikhta hai aur aapke dashboard me link dhundhne ke kaam aata hai. Chhota aur clear rakho.",
    tags: [
      { label: "Required", tone: "rose" },
      { label: "Customer ko dikhta hai", tone: "sky" },
    ],
    points: ["Maximum 60 characters", "Special symbols avoid karo", "Example: Order #1042 - Frame + Lens"],
  },
  amount: {
    hint: "Rupees me amount likho. Paise ke liye decimal use karo.",
    title: "Amount",
    description:
      "Customer se jitna paisa lena hai wo yahan bharo. Amount INR me hota hai aur taxes isme already include hone chahiye.",
    image: "https://placehold.co/600x260/ede9fe/1b1464?text=Amount+example",
    imageAlt: "Amount field example",
    tags: [
      { label: "INR", tone: "emerald" },
      { label: "Min ₹1", tone: "amber" },
    ],
    points: ["Minimum ₹1.00", "Maximum ₹5,00,000 per link", "Decimal me 2 digit tak allowed"],
    note: "Test environment me yahan koi real paisa nahi katta.",
    link: { label: "Amount limits ke baare me padho", href: "#" },
  },
  email: {
    hint: "Payment receipt is email par jayegi.",
    title: "Customer email",
    description:
      "Payment successful hone par receipt aur payment link ka reminder is email par bheja jata hai.",
    tags: [{ label: "Optional", tone: "slate" }],
  },
  mode: {
    hint: "Kaunse payment options customer ko dikhane hain.",
    title: "Payment mode",
    description:
      "Yahan se decide karo ki checkout par customer ko kaunse options dikhen. 'All' select karoge to saare enabled modes dikhenge.",
    tags: [
      { label: "UPI", tone: "violet" },
      { label: "Card", tone: "sky" },
      { label: "Netbanking", tone: "emerald" },
    ],
    points: ["UPI sabse fast settle hota hai", "Card par extra charges lag sakte hain"],
  },
  expiry: {
    hint: "Is date ke baad link kaam karna band kar dega.",
    title: "Link expiry",
    description:
      "Expiry date ke baad customer payment nahi kar payega. Khali chhodoge to link tab tak chalega jab tak aap use manually band na karo.",
    tags: [{ label: "Optional", tone: "slate" }],
  },
};
