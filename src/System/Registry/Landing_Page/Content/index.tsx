import React from 'react';
import { POODLE_CORE, GAME_CORE_FEATURES } from '../../../../Characters/Poodles/Abigay_Rose_Kone';

export const LandingPageContent: React.FC = () => {
  const features = [
    POODLE_CORE.design.appearance,
    POODLE_CORE.identity.description,
    POODLE_CORE.design.height,
    POODLE_CORE.identity.rastafarian,
    POODLE_CORE.identity.opposesBabylon,
    POODLE_CORE.identity.onlyDog,
    POODLE_CORE.mechanics.gallopRhythm,
    POODLE_CORE.mechanics.screenReaderFirst,
    POODLE_CORE.rider.role,
    POODLE_CORE.identity.ageGroup,
    GAME_CORE_FEATURES.controls.barkS,
    GAME_CORE_FEATURES.controls.loveH,
    POODLE_CORE.mechanics.glassBarrierTip,
    GAME_CORE_FEATURES.physics.runningJump,
    POODLE_CORE.design.size,
    POODLE_CORE.environment.checkedFlooring,
    POODLE_CORE.environment.grandTapestry,
    POODLE_CORE.environment.artwork,
    POODLE_CORE.environment.ambientSound,
    POODLE_CORE.environment.gardenAndFoyer,
    GAME_CORE_FEATURES.notifications.barkToggle,
    GAME_CORE_FEATURES.notifications.directionToggle,
    GAME_CORE_FEATURES.notifications.jumpNotifications,
    POODLE_CORE.environment.nightSky,
    POODLE_CORE.environment.lighting,
    GAME_CORE_FEATURES.physics.gallopPhysics
  ];

  return (
    <div className="space-y-8 text-stone-300 leading-relaxed text-lg" id="landing-content">
      <section className="space-y-4">
        <h2 className="text-3xl font-bold text-pink-500 uppercase italic tracking-tighter">Iconic Core Features</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-stone-900/50 p-3 rounded-xl border border-white/5">
              <span className="text-pink-500">◆</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-pink-400 uppercase italic">Rider's Perspective</h2>
        <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 text-stone-300 space-y-2">
          <p>As you ride atop Abigay, you'll feel the rhythmic 1-2-3 gallop that defines her majestic movement. From your high vantage point, 10 feet in the air, the world takes on a new scale. You can see the intricate details of her pink tiara and the shimmering heart-shaped gem that catches the light.</p>
          <p>Your hands are securely placed on her soft, thick fur, or grasping her pink collar with its horizontal white diamonds. The fused appearance of your legs with her fur ensures a stable and comfortable ride as you navigate the expansive foyer and garden.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-pink-400 uppercase italic">Environmental Immersion</h2>
        <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 text-stone-300 space-y-2">
          <p>The environment is designed to be as immersive as the ride itself. The pink and white checked ceramic flooring of the foyer provides a striking contrast to the lush green of the garden. At night, the sky transforms into an "Ultra Black" canvas, dotted with vibrant stars and illuminated by a large, glowing moon.</p>
          <p>The ambient sounds of the street to the north and the gentle rustle of the garden plants create a living, breathing world. Whether you're exploring the grand tapestry in the foyer or galloping through the garden, every detail is crafted for a high-quality, accessible experience.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-pink-400 uppercase italic">Core Developer's Comments</h2>
        <div className="bg-stone-900/50 p-4 rounded-xl border border-white/5 italic text-stone-300 space-y-2">
          <p>"{POODLE_CORE.developerComments.dream}"</p>
          <p>"{POODLE_CORE.developerComments.status}"</p>
          <p className="text-right text-pink-500 font-bold">— {POODLE_CORE.developerComments.role}</p>
        </div>
      </section>

      <div className="space-y-4">
        <p>{POODLE_CORE.developerComments.gameDescription}</p>
        <p>
          This path allows you to start an adventure within "Poodle Ride Adventure" and practice your poodle riding skills. 
          Typically, you go through the Adventure house first, an expansive house that is designed to be extensive, and get started with an adventure as you, the Fairy-Rider, ride <a href="https://wiki.fairiesdreamsfantasy.com/abigay_kone" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline font-bold">Abigay Rose Kone</a>, a massive white poodle standing 6 feet tall at the shoulder, with her head perched on top of her neck reaching 9 feet, and 10 feet tall at the tip of her tiara. She is a massive 8 feet long and 50 inches wide, providing a sturdy and majestic ride.
        </p>
        <p>
          However; this path is going to have expansive places where you can go through as a course, and you can use these paths that are fun to gallop along.
        </p>
      </div>

      <div className="mt-8 p-6 bg-stone-900/50 rounded-xl border border-white/5 text-stone-400 text-sm space-y-3">
        <p className="font-bold text-stone-300">Licensing Information:</p>
        <p>This work is licensed under a <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">Creative Commons Attribution-ShareAlike 4.0 International License</a>.</p>
        <p>The source code is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:underline">GNU General Public License v3.0</a>.</p>
      </div>
    </div>
  );
};
