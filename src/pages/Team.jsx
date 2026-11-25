import Reveal from '../components/common/Reveal';
import FounderSpotlight from '../components/team/FounderSpotlight';
import TeamMemberCard from '../components/team/TeamMemberCard';
import Seo from '../components/seo/Seo';
import { founder, teams } from '../data/team';
import '../styles/team.css';

export default function Team() {
  return (
    <div className="team-page">
      <Seo
        title="Leadership"
        description="Meet the OBELUS team behind our AI-driven SIEM, UEBA, threat intelligence and SOAR security operations platform."
        path="/team"
      />

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
