"use client";
import HeroHeader from "@/components/HeroHeader";
import Modal from "@/components/Modal";
import { transcriptCourses, certifications, user } from "@/lib/mock-data";
import { useApp } from "@/lib/AppState";
import { Download, Award, FileCheck, GraduationCap, ShieldCheck, Clipboard, Calendar } from "lucide-react";
import { useState } from "react";

export default function TranscriptPage() {
  const { showToast } = useApp();
  const [verifyOpen, setVerifyOpen] = useState(false);
  const totalCredits = transcriptCourses.reduce((s, c) => s + c.credits, 0);
  const gpa = (
    transcriptCourses.reduce((s, c) => s + parseFloat(c.grade) * c.credits, 0) / totalCredits
  ).toFixed(2);

  const bySemester = transcriptCourses.reduce<Record<string, typeof transcriptCourses>>((acc, c) => {
    acc[c.semester] = acc[c.semester] || [];
    acc[c.semester].push(c);
    return acc;
  }, {});

  return (
    <>
      <HeroHeader
        eyebrow="Academic Record"
        title="Your Transcript & Certifications"
        subtitle="Official records, degree verification, and digital credentials issued by Universität Bamberg."
        action={
          <button onClick={() => showToast("Official PDF transcript sent to your email")} className="btn-gold">
            <Download className="w-4 h-4" /> Download Official PDF
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Degree</div>
          <div className="text-lg font-bold text-navy-900">{user.degree}</div>
          <div className="text-xs text-gray-600 mt-1">Conferred Mar 2020</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Total Credits (ECTS)</div>
          <div className="text-2xl font-bold text-navy-900">{totalCredits}</div>
          <div className="text-xs text-gray-600 mt-1">Across {Object.keys(bySemester).length} semesters</div>
        </div>
        <div className="card p-5">
          <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold mb-1">Final Grade</div>
          <div className="text-2xl font-bold text-navy-900">{gpa}</div>
          <div className="text-xs text-navy-600 mt-1 flex items-center gap-1"><Award className="w-3 h-3" /> Sehr gut</div>
        </div>
        <div className="card p-5 bg-gradient-to-br from-navy-700 to-navy-500 text-white">
          <div className="text-xs uppercase tracking-wider text-gold-300 font-semibold mb-1">Student ID</div>
          <div className="text-2xl font-bold">{user.studentId}</div>
          <div className="text-xs text-navy-100 mt-1 flex items-center gap-1"><FileCheck className="w-3 h-3" /> Verified</div>
        </div>
      </div>

      <div className="card p-6 mb-8 flex items-start gap-4 bg-gradient-to-r from-gold-100 to-gold-50 border-gold-300">
        <div className="w-12 h-12 rounded-lg bg-gold-500 text-navy-900 flex items-center justify-center shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-navy-900 mb-1">Degree Verification</h3>
          <p className="text-sm text-navy-800 mb-3">
            Send verified, tamper-proof confirmation of your degree directly to an employer or institution.
            Powered by blockchain credentials issued by Universität Bamberg.
          </p>
          <button onClick={() => setVerifyOpen(true)} className="btn-primary text-sm">Request Verification</button>
        </div>
      </div>

      <h2 className="text-xl font-bold text-navy-900 mb-4">Coursework</h2>
      <div className="space-y-6 mb-10">
        {Object.entries(bySemester).map(([sem, courses]) => (
          <div key={sem} className="card overflow-hidden">
            <div className="px-6 py-3 bg-navy-50 border-b border-navy-100 flex items-center justify-between">
              <h3 className="font-bold text-navy-900">{sem}</h3>
              <span className="text-xs text-gray-600">
                {courses.reduce((s, c) => s + c.credits, 0)} ECTS · {courses.length} courses
              </span>
            </div>
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="text-left px-6 py-2 font-semibold">Code</th>
                  <th className="text-left px-6 py-2 font-semibold">Course</th>
                  <th className="text-right px-6 py-2 font-semibold">Credits</th>
                  <th className="text-right px-6 py-2 font-semibold">Grade</th>
                </tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.code + c.title} className="border-t border-navy-50">
                    <td className="px-6 py-3 font-mono text-xs text-gray-600">{c.code}</td>
                    <td className="px-6 py-3 font-medium text-navy-900">{c.title}</td>
                    <td className="px-6 py-3 text-right text-gray-700">{c.credits}</td>
                    <td className="px-6 py-3 text-right">
                      <span className={parseFloat(c.grade) <= 1.5 ? "chip-gold" : "chip"}>{c.grade}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold text-navy-900 mb-4">Professional Certifications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {certifications.map(c => (
          <div key={c.name} className="card p-5">
            <div className="w-10 h-10 rounded-lg bg-gold-200 text-navy-900 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-navy-900 mb-1 leading-snug">{c.name}</h3>
            <p className="text-sm text-gray-600 mb-3">{c.issuer}</p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Issued {c.issued}</span>
              {c.expires && <span>Expires {c.expires}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Verification modal */}
      <Modal open={verifyOpen} onClose={() => setVerifyOpen(false)} title="Request Degree Verification">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setVerifyOpen(false);
            showToast("✓ Verification request sent — recipient will receive tamper-proof link within 24h");
          }}
          className="space-y-4"
        >
          <p className="text-sm text-gray-600">We&apos;ll send a verifiable credential directly to the recipient&apos;s email. They can independently verify it against the university registry.</p>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Recipient name</label>
            <input required className="input bg-white border border-navy-100" placeholder="e.g. Hiring Manager at Siemens AG" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Recipient email</label>
            <input type="email" required className="input bg-white border border-navy-100" placeholder="hr@company.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-navy-900 mb-1">Purpose</label>
            <select className="select w-full bg-white border border-navy-100">
              <option>Job application</option>
              <option>Graduate school admission</option>
              <option>Professional licensing</option>
              <option>Immigration / visa</option>
              <option>Other</option>
            </select>
          </div>
          <div className="p-3 bg-navy-50 rounded-lg text-xs text-gray-700 flex items-start gap-2">
            <Clipboard className="w-4 h-4 text-navy-700 shrink-0 mt-0.5" />
            <span>The link expires in 30 days. The recipient cannot share or republish the credential without your authorization.</span>
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button type="button" onClick={() => setVerifyOpen(false)} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Send Verification</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
