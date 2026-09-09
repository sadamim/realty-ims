'use client';

// The people behind Realty Focus, managed from the admin panel.
//
// Like the testimonials section, this renders nothing at all when the team
// collection is empty, so the About page reads exactly as it did before anyone
// adds a person.
import React from 'react';
import Image from 'next/image';
import { Mail, Phone, Linkedin } from 'lucide-react';
import type { TeamMember } from '@/lib/content';

export default function TeamSection({ members }: { members: TeamMember[] }) {
  if (!members || members.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50 container">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-10">
          <h2 className="text-2xl font-bold text-realty-navy">OUR TEAM</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member) => (
            <article
              key={member._id}
              className="bg-white p-6 rounded-md shadow-md text-center flex flex-col"
            >
              <span className="relative mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-realty-navy/5">
                {member.image ? (
                  <Image src={member.image} alt={member.name} fill sizes="96px" className="object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-realty-navy/50">
                    {member.name.slice(0, 1).toUpperCase() || '?'}
                  </span>
                )}
              </span>

              <h3 className="mt-4 text-lg font-semibold text-realty-navy">{member.name}</h3>
              {member.title && <p className="text-sm text-realty-red">{member.title}</p>}
              {member.bio && <p className="mt-3 text-sm text-gray-600">{member.bio}</p>}

              {(member.email || member.phone || member.linkedin) && (
                <div className="mt-4 flex items-center justify-center gap-3 pt-4 border-t border-gray-100">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      aria-label={`Email ${member.name}`}
                      className="text-gray-400 transition-colors hover:text-realty-red"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone.replace(/\s+/g, '')}`}
                      aria-label={`Call ${member.name}`}
                      className="text-gray-400 transition-colors hover:text-realty-red"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-gray-400 transition-colors hover:text-realty-red"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
