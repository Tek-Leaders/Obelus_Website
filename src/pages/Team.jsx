import NetworkBackground from '../components/common/NetworkBackground';
import Reveal from '../components/common/Reveal';
import FounderSpotlight from '../components/team/FounderSpotlight';
import TeamMemberCard from '../components/team/TeamMemberCard';
import { teamIntro, founder, teams } from '../data/team';
import '../styles/team.css';

export default function Team() {
  return (
    <div className="team-page">
      <section className="team-hero">
        <NetworkBackground
          className="team-hero-bg"
          density={0.00007}
          maxLinkDistance={140}
          dotColor="rgba(110, 165, 255, 1)"
          glowColor="rgba(110, 165, 255, 0.95)"
          lineColor="rgba(110, 165, 255, 0.45)"
          orbColor="rgba(110, 165, 255, 0)"
        />
        <div className="team-container">
          <Reveal>
            <p className="team-eyebrow">{teamIntro.eyebrow}</p>
            <h1 className="team-hero-title">{teamIntro.title}</h1>
            <p className="team-hero-body">{teamIntro.body}</p>
          </Reveal>
        </div>
      </section>

      <FounderSpotlight founder={founder} />

      {teams.map((team) => (
        <section className="team-group" key={team.id} aria-labelledby={`team_${team.id}`}>
          <div className="team-container">
            <Reveal className="team-group-header">
              <h3 className="team-group-title" id={`team_${team.id}`}>
                {team.title}
              </h3>
              <p className="team-group-body">{team.body}</p>
            </Reveal>
            <ul className="team-grid">
              {team.members.map((member, i) => (
                <Reveal as="li" delay={i * 80} key={`${team.id}-${i}`}>
                  <TeamMemberCard member={member} />
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      ))}
    </div>
  );
}
