import texturedCropImg from "@/assets/hairstyles/textured-crop.jpg";
import classicFadeImg from "@/assets/hairstyles/classic-fade.jpg";
import quiffImg from "@/assets/hairstyles/quiff.jpg";
import buzzCutImg from "@/assets/hairstyles/buzz-cut.jpg";
import pompadourImg from "@/assets/hairstyles/pompadour.jpg";
import curlyFringeImg from "@/assets/hairstyles/curly-fringe.jpg";
import slickBackImg from "@/assets/hairstyles/slick-back.jpg";
import messyMediumImg from "@/assets/hairstyles/messy-medium.jpg";
import undercutImg from "@/assets/hairstyles/undercut.jpg";
import afroFadeImg from "@/assets/hairstyles/afro-fade.jpg";
import manBunImg from "@/assets/hairstyles/man-bun.jpg";
import frenchCropImg from "@/assets/hairstyles/french-crop.jpg";
import taperBeardImg from "@/assets/hairstyles/taper-beard.jpg";
import curtainsImg from "@/assets/hairstyles/curtains.jpg";
import crewCutImg from "@/assets/hairstyles/crew-cut.jpg";

export interface HairStyle {
  id: string;
  name: string;
  faceShapes: string[];
  hairType: string;
  length: string;
  trending: boolean;
  description: string;
  howTo: string[];
  products: string[];
  emoji: string;
  image?: string;
}

export const faceShapes = ["All", "Oval", "Round", "Square", "Oblong", "Heart", "Diamond"];
export const hairTypes = ["All", "Straight", "Wavy", "Curly", "Coily"];
export const lengths = ["All", "Short", "Medium", "Long"];

export const hairstyles: HairStyle[] = [
  { id: "h1", name: "Textured Crop", faceShapes: ["Oval", "Square", "Heart"], hairType: "Straight", length: "Short", trending: true, emoji: "✂️", image: texturedCropImg,
    description: "Clean, modern, and low-maintenance. The textured crop is a versatile cut that works for most men.",
    howTo: ["Ask barber for short sides (2-3 guard)", "Leave 2-3 inches on top", "Texturize the top with point cutting", "Style with matte clay for natural finish"],
    products: ["Matte clay", "Sea salt spray", "Texturizing powder"] },
  { id: "h2", name: "Classic Fade", faceShapes: ["Oval", "Round", "Square"], hairType: "Straight", length: "Short", trending: true, emoji: "💈", image: classicFadeImg,
    description: "Timeless and sharp. The fade is the foundation of modern men's barbering.",
    howTo: ["Start with 0 or skin at the bottom", "Gradually blend to longer on top", "Clean neckline and around ears", "Keep top styled back or to the side"],
    products: ["Pomade", "Edge control", "Barber spray"] },
  { id: "h3", name: "Quiff", faceShapes: ["Oval", "Heart", "Diamond"], hairType: "Straight", length: "Medium", trending: true, emoji: "🌊", image: quiffImg,
    description: "Volume and style combined. The quiff adds height and gives a confident, polished look.",
    howTo: ["Keep 3-4 inches on top", "Shorter sides, faded or scissor cut", "Blow-dry upward and back", "Finish with medium-hold pomade"],
    products: ["Volumizing mousse", "Medium-hold pomade", "Hair dryer"] },
  { id: "h4", name: "Buzz Cut", faceShapes: ["Oval", "Square", "Diamond"], hairType: "Straight", length: "Short", trending: false, emoji: "⚡", image: buzzCutImg,
    description: "No-nonsense, ultra-masculine. Shows off facial structure and requires zero styling.",
    howTo: ["Use clipper guard #1-3 all over", "Even length throughout", "Clean up neckline", "Done — zero maintenance"],
    products: ["Sunscreen for scalp", "Moisturizer"] },
  { id: "h5", name: "Pompadour", faceShapes: ["Oval", "Square", "Oblong"], hairType: "Straight", length: "Medium", trending: true, emoji: "👑", image: pompadourImg,
    description: "Bold, retro-inspired style with modern appeal. Makes a strong statement.",
    howTo: ["Need 4-5 inches on top minimum", "Tapered or faded sides", "Blow-dry hair up and back", "Apply high-hold pomade and shape"],
    products: ["High-hold pomade", "Blow dryer", "Round brush"] },
  { id: "h6", name: "Curly Fringe", faceShapes: ["Oval", "Heart", "Diamond"], hairType: "Curly", length: "Medium", trending: true, emoji: "🌀", image: curlyFringeImg,
    description: "Embrace natural curls with a styled fringe. Modern and effortlessly cool.",
    howTo: ["Let top grow 3-4 inches", "Fade or taper the sides", "Apply curl cream to damp hair", "Scrunch and air dry or diffuse"],
    products: ["Curl defining cream", "Diffuser attachment", "Leave-in conditioner"] },
  { id: "h7", name: "Slick Back", faceShapes: ["Oval", "Square", "Heart"], hairType: "Straight", length: "Medium", trending: false, emoji: "🪮", image: slickBackImg,
    description: "Sophisticated and powerful. Perfect for formal occasions or a sleek daily look.",
    howTo: ["Need 4+ inches on top", "Apply pomade to damp hair", "Comb straight back", "Use blow dryer for extra hold"],
    products: ["High-shine pomade", "Fine-tooth comb", "Blow dryer"] },
  { id: "h8", name: "Messy Medium", faceShapes: ["Oval", "Round", "Heart"], hairType: "Wavy", length: "Medium", trending: true, emoji: "🌿", image: messyMediumImg,
    description: "Relaxed, effortless style. The 'I woke up like this' look that actually takes strategy.",
    howTo: ["Grow hair to ear length", "Light layers throughout", "Apply sea salt spray to damp hair", "Tousle with fingers and air dry"],
    products: ["Sea salt spray", "Texturizing paste", "Leave-in conditioner"] },
  { id: "h9", name: "Undercut", faceShapes: ["Oval", "Square", "Diamond"], hairType: "Straight", length: "Short", trending: true, emoji: "⚔️", image: undercutImg,
    description: "High-contrast, edgy look. Shaved sides with length on top for maximum versatility.",
    howTo: ["Shave sides to skin or #1", "Leave 3-5 inches on top", "Hard part optional", "Style top in any direction"],
    products: ["Matte paste", "Blow dryer", "Styling powder"] },
  { id: "h10", name: "Afro Fade", faceShapes: ["Round", "Oval", "Square"], hairType: "Coily", length: "Short", trending: true, emoji: "✊", image: afroFadeImg,
    description: "Sharp, clean, and celebrates natural texture. Low maintenance with high impact.",
    howTo: ["Skin fade on sides", "Keep top at 1-2 inches", "Shape up the hairline", "Moisturize daily"],
    products: ["Moisturizing cream", "Pick comb", "Edge control"] },
  { id: "h11", name: "Man Bun", faceShapes: ["Oval", "Oblong", "Square"], hairType: "Straight", length: "Long", trending: false, emoji: "🔝", image: manBunImg,
    description: "For the patient man who grew it out. Versatile and practical.",
    howTo: ["Grow hair past chin length", "Pull back into bun at crown", "Use hair tie — not rubber bands", "Leave some pieces loose for casual look"],
    products: ["Leave-in conditioner", "Hair ties", "Argan oil"] },
  { id: "h12", name: "French Crop", faceShapes: ["Oval", "Square", "Round"], hairType: "Straight", length: "Short", trending: true, emoji: "🇫🇷", image: frenchCropImg,
    description: "European-inspired elegance. Short, textured, with a signature forward fringe.",
    howTo: ["Short all around, slightly longer on top", "Fringe comes forward to the forehead", "Texturize with scissors", "Style forward with matte product"],
    products: ["Matte clay", "Texturizing spray", "Scissors for maintenance"] },
  { id: "h13", name: "Taper Fade with Beard", faceShapes: ["Oval", "Round", "Heart"], hairType: "Straight", length: "Short", trending: true, emoji: "🧔", image: taperBeardImg,
    description: "The complete package. Clean taper that flows seamlessly into a groomed beard.",
    howTo: ["Taper fade on sides", "Blend sideburns into beard", "Keep beard lined up", "Medium length on top, styled to the side"],
    products: ["Beard oil", "Pomade", "Beard balm", "Trimmer"] },
  { id: "h14", name: "Curtains / eBoy", faceShapes: ["Oval", "Heart", "Diamond"], hairType: "Straight", length: "Medium", trending: true, emoji: "🎭", image: curtainsImg,
    description: "90s revival with a modern twist. Center or off-center part with curtain-style framing.",
    howTo: ["Grow top to chin length or longer", "Part in center or slightly off-center", "Blow-dry each side outward", "Finish with light-hold product"],
    products: ["Light-hold cream", "Blow dryer", "Round brush"] },
  { id: "h15", name: "Crew Cut", faceShapes: ["Oval", "Square", "Oblong"], hairType: "Straight", length: "Short", trending: false, emoji: "🎖️", image: crewCutImg,
    description: "Military-inspired classic. Consistently sharp and professional.",
    howTo: ["Short taper on sides", "About 1-2 inches on top", "Slightly longer in front", "Brush forward and slightly to the side"],
    products: ["Light pomade", "Comb"] },
];
