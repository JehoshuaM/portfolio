import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectStage from './projects/ProjectStage';
import BlockchainStage from './projects/BlockchainStage';
import NeuralStage from './projects/NeuralStage';
import VoxelStage from './projects/VoxelStage';
import GitStage from './projects/GitStage';
import usePrefersReducedMotion from './projects/usePrefersReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    index: '01',
    title: 'BLOCKCHAIN',
    status: 'Completed',
    description:
      'Built a blockchain from scratch in Go to understand hashing, Proof of Work, persistent storage, and distributed systems.',
    repoHref: 'https://github.com/fabledruns/blockchain',
    theme: 'amethyst',
    Stage: BlockchainStage,
  },
  {
    index: '02',
    title: 'NEURAL NETWORK',
    status: 'In Development',
    description:
      'Learning neural networks from first principles by implementing every component instead of relying on frameworks.',
    theme: 'amber',
    Stage: NeuralStage,
  },
  {
    index: '03',
    title: 'VOXEL ENGINE',
    status: 'Planned',
    description:
      'Building a voxel engine to understand rendering pipelines, chunk systems, greedy meshing, procedural generation, and graphics programming.',
    theme: 'cyan',
    Stage: VoxelStage,
  },
  {
    index: '04',
    title: 'GIT',
    status: 'Planned',
    description:
      'Rebuilding Git from scratch to understand version control beneath the command line.',
    theme: 'red',
    Stage: GitStage,
  },
];

export default function Projects() {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 1.1 },
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
        },
      });

      introTl
        .from('.projects__intro .section-label', { y: 16, opacity: 0 })
        .from('.projects__title-line', { yPercent: 110, opacity: 0, stagger: 0.1, duration: 1.2 }, '-=0.5')
        .from('.projects__aside', { y: 16, opacity: 0 }, '-=0.7');

      const stages = gsap.utils.toArray('.stage');
      stages.forEach((stage) => {
        ScrollTrigger.create({
          trigger: stage,
          start: 'top top',
          end: 'bottom top',
          snap: {
            snapTo: [0, 1],
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: 'power1.inOut',
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="work" ref={ref} className="projects">
      <div className="projects__intro">
        <div>
          <p className="section-label">Projects</p>
          <h2 className="projects__title">
            <span className="projects__title-row">
              <span className="projects__title-line">Four builds,</span>
            </span>
            <span className="projects__title-row">
              <span className="projects__title-line projects__title-line--accent">four worlds.</span>
            </span>
          </h2>
        </div>
        <p className="projects__aside">
          scroll to walk through each exhibit — the interaction is the project.
        </p>
      </div>

      {PROJECTS.map(({ Stage, ...rest }) => (
        <ProjectStage key={rest.index} {...rest}>
          <Stage />
        </ProjectStage>
      ))}
    </section>
  );
}
