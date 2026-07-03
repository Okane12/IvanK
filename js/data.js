// ─────────────────────────────────────────────────────────────────────────
// SITE CONTENT — edit this file to update your bio, contact info, and
// projects. No code lives here, only data.
// ─────────────────────────────────────────────────────────────────────────

const PROFILE_NAME = "Ivan Kuang";
const PROFILE_BIO = `I am a Mechanical Engineering student at UC Berkeley, passionate about solving complex physical challenges. I am actively involved in high-performance engineering teams like CalSol (Solar Vehicle Racing) and STAR (Space Technology and Rocketry), where I design composite structures and aerospace components. Outside of the workshop, I enjoy F1 (McLaren fan), woodworking, and lion dance.`;
const CONTACT_EMAIL = "ivan.kuang12@berkeley.edu";
const CONTACT_PHONE = "626-609-8004";
const LINKEDIN_URL = "https://www.linkedin.com/in/ivan-kuang/";
const RESUME = "./pdfs/resume-ivan-kuang.pdf";

// Each project: card info (title, description, tags, image) plus a
// `details` object that fills the project's dedicated page.
const PROJECTS = [{
  id: '1',
  category: 'Academic & Personal Projects',
  title: 'Wind Turbine',
  description: 'Designed a wind tower under strict constraints (<17 in³ volume, 16" height) for a 9x9x9" 3D printer. The design successfully housed motors and turbine blades while minimizing deflection (9.63mm under 3.5kg load). Validated performance outputs of 0.5W power generation through physical testing.',
  tags: ['3D Printing', 'DfM', 'Simulation', 'Prototyping', 'Solidworks', 'FEA'],
  imageUrl: './images/Turbine1.png',
  link: './pdfs/e26-lab-report.pdf',
  details: {
    overview: 'This was a semester-long project for Engineering 26 at UC Berkeley. The goal was to design, fabricate, and physically test a 3D-printed wind turbine system optimized for both power output and structural stiffness.',
    sections: [{
      heading: 'The Challenge',
      body: 'The design had to fit within strict constraints: less than 17 in³ of material, exactly 16" motor shaft height, and a 9×9×9" 3D printer build volume. This forced the tower to be printed in two halves and joined together.'
    }, {
      heading: 'Rotor Design',
      body: 'After an extensive literature review, we settled on a 3-blade NACA 4412 airfoil profile with a ~7° angle of attack and 15° twist angle. The swept diameter was 5.9" to maximize energy capture. Blades were lofted in SolidWorks from three cross-sectional profiles and propagated using a circular pattern.'
    }, {
      heading: 'Tower Design',
      body: 'The tower uses a triangular base that lofts into a spiraling truss upper section. Triangular cross-bracing was chosen for its stiffness-to-volume ratio. The two halves connect via tapered male/female pegs and were bonded with Loctite 435 ABS glue. Final volume: 15.92 in³.'
    }, {
      heading: 'FEA & Structural Analysis',
      body: 'A 99,774-element solid mesh was run in SolidWorks Simulation with a 9.8N tip load. Max von Mises stress: 8.77 MPa (well below ABS yield of 20 MPa). Minimum FOS: 4.4. Predicted deflection at 1kg: 1.92mm.'
    }, {
      heading: 'Testing Results',
      body: 'Power test at 25 mph: peak output of 0.5W at 1.45V, 335mA, 2683 RPM. Deflection test: 2.63mm at 1kg load (vs. 1.92mm predicted — 25% higher, likely due to FDM layer anisotropy). Tower stiffness: 3.55 N/mm. Stiffness-per-gram: 19.9 N/mm·kg.'
    }, {
      heading: 'What I Learned',
      body: 'FEA assumes isotropic material, which FDM prints are not. Layer orientation relative to load direction significantly affects real-world stiffness. For the rotor, the hub thickness constrained our ability to implement the desired twist angle, limiting efficiency to 0.83% vs. the Betz limit of 59.3%. Future iterations would prioritize a hub redesign to allow greater twist.'
    }]
  }
}, {
  id: '2',
  category: 'Competition & Awards',
  title: 'C.A.R.E. System',
  description: 'Designed a scalable material handling solution for semiconductor fabrication environments. The system focused on maneuverability, sensitive material containment, and precision handling constraints. This design won First Place in the ASME Cadathon for its efficiency, safety features, and innovative approach to material compatibility.',
  tags: ['Product Design', 'Material Handling', 'Award Winner', 'Solidworks', 'Onshape', 'FEA'],
  imageUrl: './images/Care1.png',
  link: './pdfs/cadathon-2025-care.pdf',
  details: {
    overview: 'C.A.R.E. (Cleanroom Automated Robot Entity) was designed in 12 hours for the 2025 ASME Cadathon and won First Place. The challenge: design a scalable material handling solution for ISO Class 1-5 semiconductor cleanroom environments.',
    sections: [{
      heading: 'The Problem',
      body: 'Semiconductor fabs handle sensitive wafers and components that are vulnerable to vibration, static discharge, and particulate contamination. Existing solutions are either extremely expensive (>$100k) or require human intervention that introduces contamination risk.'
    }, {
      heading: 'The Cart',
      body: 'A 30"×18"×30" enclosed cart with polycarbonate magnetic-sealed doors and rubber outlines to prevent particle leakage. Mecanum wheels allow omnidirectional movement. A detachable handle enables manual operation as a fallback. FEA on the wheel connector (Al 7075) showed FOS > 800 under 50 lb load. Center of gravity: 12.1", which is low enough to prevent tipping.'
    }, {
      heading: 'The Stabilizer',
      body: 'A 3-DOF kinematic platform using three NEMA 17 stepper motors and stainless steel pushrods to actively level the tray surface. Inspired by camera gimbals, a 3-point isolator layout forms a kinematic triangle under the tray. A PID loop driven by an IMU damps angular drift in real time. All materials are ESD-safe and cleanroom-compatible.'
    }, {
      heading: 'The Robotic Arm',
      body: 'A 3-joint robotic arm with shaftless brushless DC motors and 1" OD fiberglass tubes (swapped from aluminum to reduce particle shedding). Joints are covered in Mylar for static discharge protection. A vacuum-tip end effector handles wafer pick-and-place. Reach was calculated geometrically to cover the full interior of the cart and extend to external workstations.'
    }, {
      heading: 'Why It Won',
      body: 'The design hit 95% of commercial system functionality at under 5% of the cost (~$2,000 vs. $100,000+). The iterative CAD process from 2D layout sketches in GoodNotes → Onshape for collaboration → SolidWorks for FEA — was highlighted by judges as unusually rigorous for a 12-hour competition.'
    }]
  }
}, {
  id: '3',
  category: 'Club & Team Projects',
  title: 'Airframe Structural Design',
  description: 'Developed protection strategies for external rocket hardware (wiring, pipes) against aerodynamic exposure. Implemented a chassis extension to replace a high-stress coupler on the Solid Demonstrator rocket, maximizing the structural Factor of Safety (FOS). Currently designing and analyzing Von Karman nose cones to minimize parasitic drag.',
  tags: ['Onshape', 'Structural Analysis', 'Solidworks FEA', 'Aerodynamics'],
  imageUrl: './images/STAR1.png',
  link: './pdfs/star-airframe.pdf',
  details: {
    overview: 'As an Airframe Engineer on UC Berkeley\'s STAR (Space Technology and Rocketry) team, I work on the structural systems of the Solid Demonstrator rocket. This is a high-powered vehicle designed as a precursor to the primary flight vehicle.',
    sections: [{
      heading: 'Chassis Extension',
      body: 'The original design used a coupler to join airframe sections, which served as a known stress concentration point. I redesigned this as a continuous chassis extension modeled in Onshape and validated in SolidWorks FEA. I applied fixed boundary conditions on the bottom bolt ring and an 1100 lbf axial load at the top. The result was a factor of safety of approximately 4, which matched my hand calculations. I added chassis rings at every 1-foot interval to distribute axial loads and maintain tube alignment. I am currently working on further improvements to reduce overall weight while maximizing structural integrity.'
    }, {
      heading: 'Airframe Runners',
      body: 'Wiring harnesses, pipes, and engine components that extend beyond the main body tube are vulnerable to aerodynamic loading and impact. I designed a two-part runner system: discrete internal L-brackets (high shear stiffness, mass-optimized over continuous rails) and a trapezoidal outer cover with a 15° angled profile that deflects shockwaves and maintains laminar flow. Assembly uses countersunk bolts for a smooth aerodynamic surface.'
    }, {
      heading: 'Simulation Analysis',
      body: 'Impact load FEA: vertical descent simulation, peak stress 199.2 MPa within elastic limits. Vibration analysis: primary natural frequency at 1,749.3 Hz, which is well outside the engine-induced vibration range, preventing resonance failure. Fastener placement was optimized by mapping nodal regions in the vibration mode shapes to prevent loosening under cyclic loading.'
    }, {
      heading: 'Current Work',
      body: 'Currently designing and analyzing Von Karman nose cone geometries to minimize parasitic drag on the primary flight vehicle. Also developing additional airframe protection strategies for avionics bays and external sensor packages.'
    }]
  }
}, {
  id: '4',
  category: 'Club & Team Projects',
  title: 'Occupancy Cell',
  description: 'Designed and developed the occupancy cell for the solar vehicle GEN XI. Currently developing a comprehensive manufacturing plan for the composite structure, including joining procedures, epoxy application, and clamping strategies. Researching materials and layup schedules to ensure structural integrity for the final assembly.',
  tags: ['Composites', 'Manufacturing', 'Automotive', 'Surface Modeling', 'TIG Welding', 'MIG Welding', 'Solidworks'],
  imageUrl: './images/calsol1.png',
  link: '#',
  details: {
    overview: 'As a Chassis Engineer on CalSol (UC Berkeley\'s Solar Vehicle Racing team), I am designing and manufacturing the occupancy cell for GEN XI — the primary load-bearing composite structure that forms the driver\'s compartment of the vehicle.',
    sections: [{
      heading: 'What Is the Occupancy Cell?',
      body: 'The occupancy cell is the structural backbone of the solar vehicle. It houses the driver, integrates with the suspension, and must meet ASME Solar Car challenge safety requirements. It is a monocoque composite structure, meaning the skin itself carries structural loads rather than relying on an internal frame.'
    }, {
      heading: 'CAD & Design Work',
      body: 'Using SolidWorks surface modeling tools, I developed the 3D geometry of the occupancy cell while optimizing for internal volume, aerodynamic integration, and structural continuity at attachment points. The design focuses on reinforcement at high-stress regions: door cutouts, roll hoop interface, and suspension pickup points.'
    }, {
      heading: 'Manufacturing Plan',
      body: 'Currently developing a comprehensive composite manufacturing plan covering: layup schedule (fiber orientation, ply count, core placement), epoxy selection and application procedure, vacuum bagging and autoclave cycle parameters, jig and support design for dimensional control, and joining methodology for multi-part assembly.'
    }, {
      heading: 'Status',
      body: 'This project is actively in progress. Manufacturing documentation is being finalized and physical layup is expected to begin soon. Updates will be added here as the project develops.'
    }]
  }
}, {
  id: '5',
  category: 'Academic & Personal Projects',
  title: 'Skofnung',
  description: 'Designed a 1 lb plastic antweight combat robot built around a custom shuffle-drive system. Uses a four-bar linkage driven by a crank to produce an optimized walking path, modeled through Python simulations to refine stride length and step height.',
  tags: ['Onshape', 'DfM', '3D Printing', 'Mechanical Design'],
  imageUrl: './images/SKOFNUNG1.png',
  link: '#',
  details: {
    overview: 'Skofnung is a 1 lb antweight combat robot engineered with a shuffle-drive locomotion system. This is a departure from the wheel-dominated norms of its weight class. Named for the legendary Norse sword, the robot is designed to prioritize arena control and pushing power over traditional weapon-based attacks.',
    sections: [{
      heading: 'Why Shuffle Drive?',
      body: 'Shuffle-drive robots use mechanical legs instead of wheels, producing more ground contact area and potentially better pushing traction. Inspired by Silent X and Monkfish, I wanted to explore whether this drivetrain could be competitive at 1 lb where weight is extremely constrained.'
    }, {
      heading: 'Four-Bar Linkage Design',
      body: 'The locomotion uses a four-bar linkage driven by a crank to generate the walking path. I modeled the kinematics in Python, varying crank position, link lengths, and coupler geometry to optimize stride length and step height for smooth, controllable forward motion. The simulation output foot trajectory curves that I used to select the final geometry.'
    }, {
      heading: 'CAD & Packaging',
      body: 'Drive modules were developed in Onshape using a master sketch approach where all critical geometry defined in a single sketch, with parts referencing it. This allowed rapid iteration without downstream rebuild failures. Tight packaging was critical to hit the 1 lb limit while fitting motors, ESCs, and a receiver.'
    }, {
      heading: 'Fabrication',
      body: 'Feet were SLA-printed in Formlabs Elastic 40A resin for grip and compliance. The main chassis is FDM-printed in PLA for cost and iteration speed, with future versions planned in Onyx for impact resistance. Assembly uses press-fit joints and M2 hardware throughout.'
    }, {
      heading: 'Status',
      body: 'Currently in final assembly and initial drive testing.'
    }]
  }
}, {
  id: '6',
  category: 'Research',
  title: 'Binder Jet Printer',
  description: 'Developed a high-fidelity Binder Jetting research platform at a 90% cost reduction compared to commercial units. Integrated a 40MP in-situ imaging pipeline and CNN-based defect detection framework for real-time anomaly classification.',
  tags: ['Solidworks', 'Electronics', 'Machine Learning', 'Mechanical Design', '3D Printing', 'Materials Science'],
  imageUrl: './images/BinderJet.jpg',
  link: '#',
  details: {
    overview: 'As an Undergraduate Researcher in the Gu Research Group at UC Berkeley, I am helping develop a custom binder jetting research platform. We built this from scratch at a 90% cost reduction compared to commercial systems to study green body structural integrity and process parameter optimization.',
    sections: [{
      heading: 'Why Build It From Scratch?',
      body: 'Commercial binder jet printers cost $200k–$1M+ and offer no access to process internals. By building our own, we can instrument every axis, tune every parameter, and implement in-situ imaging that commercial machines do not support. Total build cost: under $15,000.'
    }, {
      heading: 'Mechanical Architecture',
      body: 'I contributed to the design and fabrication of the core mechanical systems: high-tolerance aluminum build and feed piston assemblies with custom O-ring seals for total powder containment, linear motion stages for the recoater and print carriage, and the enclosure structure. All tolerances were held to ±0.002" on sealing surfaces to prevent powder migration between the build and overflow chambers.'
    }, {
      heading: 'In-Situ Imaging Pipeline',
      body: 'A 40MP camera captures each powder layer after recoating. Images are processed to detect surface defects such as voids, cracks, and uneven spreading before the binder is deposited. This allows us to correlate process parameters like print speed, roller speed, powder density, and overfeed ratio with green body quality in real time.'
    }, {
      heading: 'CNN Defect Detection',
      body: 'Using labeled defect datasets from our imaging pipeline, a CNN-based classifier has been developed using image segmentation to identify and categorize anomalies. The objective is to establish a closed-loop control system that automatically adjusts parameters mid-print upon defect detection, a capability that currently remains absent from commercial platforms.'
    }, {
      heading: 'Status',
      body: 'Mechanical assembly is complete. Electronics integration and software pipeline are actively in development. First print tests are planned for this semester.'
    }]
  }
}, {
  id: '7',
  category: 'Academic & Personal Projects',
  title: 'Desk Extender',
  description: 'Designed and fabricated a foldable desk extender for small classroom seats. The device clamps onto any desk edge, unfolds to expand usable surface area, and includes a rear laptop pocket — all from laser-cut plywood, 3D-printed PLA, and machined aluminum hardware.',
  tags: ['Laser Cutting', '3D Printing', 'FEA', 'Plywood', 'GD&T', 'Onshape', 'Fabrication'],
  imageUrl: './images/desktopextenderclosed.png',
  imagePosition: 'center 50%',
  imageScale: 1,
  link: './pdfs/e29-final-project-report.pdf',
  details: {
    overview: 'Team 101-1\'s Desk Extender is a Spring 2026 Engineering 29 capstone project. The device mounts to small auditorium-style desks via a dual-clamp rail, then unfolds a hinged wooden surface to nearly double available workspace. A rear pocket stores a laptop securely. The full assembly blends laser-cut birch plywood, PLA 3D-printed brackets, and machined Aluminum 6061 standoffs.',
    videoLink: 'https://drive.google.com/file/d/11FkBVWuMpfkhLuJlVebbYfmFK-Mbas_P/view?usp=sharing',
    cadLink: 'https://cad.onshape.com/documents/d71e4eeebce875e60bad1736/w/99ba947de1130029e2c9cb7c/e/3049beb7b776da85c2f05cf0',
    sections: [{
      heading: 'Problem & Motivation',
      body: 'Standard lecture hall tablet-arm desks offer only ~12×16 inches of working surface — barely enough for a laptop. Students who need to use both a notebook and a laptop simultaneously run out of room. Our team of six set out to design a modular add-on that clamps securely, stores flat when not in use, and expands surface area without interfering with neighboring seats.'
    }, {
      heading: 'Design Iterations',
      body: 'Our first concept used a telescoping aluminum rod clamp with pivot bars to hold the platform. After structural analysis revealed the PLA pivot bar would fail under repeated bending, we pivoted to a C-clamp + railed-beam approach. The hinge mounting system also changed significantly: initial designs used a horizontal barrel hinge that created stress concentrations at the MDF insert points, so we switched to a custom 3D-printed HingeMountBoardSide bracket paired with machined Aluminum 6061 standoffs. The laptop pocket started as a simple flat shelf but evolved into a full finger-jointed box with a hinged lid. Three major iterations were completed before the final fabricated prototype.',
      images: [{
        src: './images/FinalCAD.png',
        caption: 'Final CAD — railed beam, custom hinge mount, box pocket',
        imagePosition: 'center 30%'
      }]
    }, {
      heading: 'Material & Process Selection',
      body: 'We evaluated four main candidates for the platform surface: Aluminum 6061-T6, Delrin (Acetal), 0.25" Birch Plywood, and Polycarbonate. FOS and deflection calculations under an 8 lb laptop load on a 15-inch cantilever showed aluminum at FOS 64 and only 0.018" deflection, but its weight and cost were impractical for a prototype. Plywood struck the right balance at FOS 9.2 and 0.117" deflection — stiff enough not to feel flexy under load while remaining affordable and laser-cuttable. PLA 3D printing was selected for brackets, clamp bodies, and hinge mounts where complex geometry mattered more than ultimate strength. The single load-critical part — the Hinge Standoff — was machined from Aluminum 6061 because FEA showed the PLA version exceeded its failure stress.',
      specialComponent: 'materialsTable'
    }, {
      heading: 'Fits & Tolerances',
      body: 'Eight fit relationships were defined and ANSI-graded. Most finger joints use LC6 (locational clearance) since wood laser cutting cannot hold tight tolerances — wood glue compensates by filling gaps and adding adhesion. Rotation joints (hinge-to-standoff, clamp pivot bar) use RC4–RC7 grades. Because 3D-printed PLA typically delivers ±0.2–0.5 mm, tolerances were compensated in CAD geometry directly rather than relying on machine precision.',
      specialComponent: 'fitsTable'
    }, {
      heading: 'Structural Analysis',
      body: 'FEA in SolidWorks Simulation was run on the PLA HingeMountBoardSide bracket under the full 8 lb laptop load (applied as a cantilever moment). Results showed maximum principal stress of 144.42 MPa — exceeding PLA\'s ~50 MPa tensile strength. Re-running with Aluminum Alloy brought stress well within the 270 MPa yield of 6061-T6. This confirmed our decision to machine the standoff from aluminum and flag the hinge mount as a market-version upgrade target. Maximum deformation was 0.00085 inches at the standoff hole interface — negligible for function.'
    }, {
      heading: 'Prototype Reflection',
      body: 'The final prototype met both primary goals: it expanded desk area significantly and stored a laptop securely. The laser-cut finger joints were glued with wood glue and held well through testing, though long-term fatigue of the glue bond is a concern we\'d address with mechanical fasteners in a v2. The 3D-printed clamp bodies performed acceptably but showed slight creep under sustained clamping load. Future improvements: a more compact clamp attachment, a latch to prevent the laptop from sliding out, and composite or injection-molded hinges for durability. Overall we\'re proud of a working, buildable prototype that solves a real problem.'
    }],
    gdtPdfs: [{
      pdfUrl: './pdfs/e29-gdt-final-project.pdf',
      label: 'GD&T DRAWINGS',
      totalPages: 11
    }],
    materialsData: [{
      id: 1,
      name: 'Knob Mount',
      material: 'PLA (proto) / Aluminum (market)',
      process: '3D Printing / CNC',
      justification: 'PLA for fast, cheap prototyping; CNC aluminum for durability in a market version.'
    }, {
      id: 2,
      name: 'Fold-Out Top',
      material: 'Wood',
      process: 'Laser Cutter',
      justification: 'Mostly flat — laser cutting is faster and cleaner than 3D printing for this geometry.'
    }, {
      id: 3,
      name: 'Wood Laptop Holder',
      material: 'Wood',
      process: 'Laser Cutter',
      justification: 'Same reasoning as fold-out top. PLA would take longer and look less polished.'
    }, {
      id: 4,
      name: 'Hinge',
      material: 'PLA (proto) / Metal (market)',
      process: '3D Print / Injection Mold',
      justification: 'PLA works for testing; metal or injection molding needed for repeated motion in production.'
    }, {
      id: 5,
      name: 'Clamp Rod',
      material: 'Aluminum (premade)',
      process: 'Buy OTS',
      justification: 'Load-bearing. Aluminum OTS rod is strong, reliable, and avoids custom machining time. (Abandoned in redesign.)'
    }, {
      id: 6,
      name: 'Clamp Pivot Bar',
      material: 'Wood',
      process: 'Laser Cutter',
      justification: 'Flat, lightly loaded — laser cutting is faster than 3D printing. (Old design, replaced.)'
    }, {
      id: 7,
      name: 'Clamp Beam Mount / Hinge Holder',
      material: 'PLA',
      process: '3D Printing',
      justification: 'Not heavily loaded; PLA is strong enough and faster to iterate.'
    }, {
      id: 8,
      name: 'Hinge Standoff',
      material: 'Aluminum 6061',
      process: 'Machining',
      justification: 'Carries high stress — PLA failed FEA. Machined Al 6061 is strong and durable.'
    }, {
      id: 9,
      name: 'Hinge Board Side',
      material: 'PLA',
      process: '3D Printing',
      justification: 'Complex 3D shape, small enough that print time is not an issue. PLA sufficient per stress analysis.'
    }, {
      id: 10,
      name: 'C-Clamp',
      material: 'PLA',
      process: '3D Printing',
      justification: 'Provides necessary structural integrity for prototype; easier to manufacture than CNC aluminum.'
    }],
    fitsData: [{
      fit: 1,
      compA: 'LaptopHolderBoardTop',
      compB: 'LaptopHolderBoardSide',
      function: 'Finger joints',
      ansi: 'LC6',
      tolA: '1 in + 0.002 in (finger length)',
      tolB: '1 in −0.0008 to −0.002 in (gap length)',
      deliverable: 'No — glue compensates'
    }, {
      fit: 2,
      compA: 'HingeMountBoardSide',
      compB: 'LaptopHolderBoardSide',
      function: 'Hold hinge mount',
      ansi: 'LC6',
      tolA: '2 in + 0.002 in',
      tolB: '2 in −0.0008 to −0.002 in',
      deliverable: '3DP: No — adjusted in CAD'
    }, {
      fit: 3,
      compA: 'Hinge',
      compB: 'HingeStandoff',
      function: 'Loose rotation joint',
      ansi: 'RC5',
      tolA: 'Hole ⌀6 mm + 0.0007 in',
      tolB: 'Standoff ⌀6 mm −0.0008 to −0.0013 in',
      deliverable: '3DP: No / Al standoff: Yes'
    }, {
      fit: 4,
      compA: 'ClampPivotBar',
      compB: 'Standoff or Screw',
      function: 'Rotation joint',
      ansi: 'RC4',
      tolA: 'Hole ⌀0.25 in + 0.0009 in',
      tolB: 'Rod ⌀0.25 in −0.0005 to −0.0011 in',
      deliverable: 'No — adjusted in CAD'
    }, {
      fit: 5,
      compA: 'HingeMountBoardSide',
      compB: 'Hinge',
      function: 'Pivot clearance',
      ansi: 'RC7',
      tolA: 'Mount inner 38.1 mm + 0.0025 in',
      tolB: 'Hinge 38.1 mm −0.003 to −0.0046 in',
      deliverable: '3DP: No — adjusted in CAD'
    }, {
      fit: 6,
      compA: 'LocknutRetainer',
      compB: 'Locknut',
      function: 'Hex anti-rotation',
      ansi: 'LC6',
      tolA: 'Flat-to-flat 5.7 mm + 0.0012 in',
      tolB: '5.7 mm −0.0004 to −0.0011 in',
      deliverable: '3DP: No — adjusted in CAD'
    }, {
      fit: 7,
      compA: 'ScrewCapToScrew',
      compB: 'Clamp Screw',
      function: 'Clamping surface',
      ansi: 'LC3',
      tolA: 'Hole ⌀0.25 in + 0.001 in',
      tolB: 'Screw ⌀0.25 in −0.0005 to −0.001 in',
      deliverable: '3DP: No — adjusted in CAD'
    }, {
      fit: 8,
      compA: 'All screws',
      compB: 'All holes',
      function: 'Clearance holes',
      ansi: 'ASME B18.2.8',
      tolA: 'Per SolidWorks HoleWizard',
      tolB: 'Auto-sized',
      deliverable: 'Yes (standard sizing)'
    }]
  }
}];
