import WalkathonForm from "@/components/walkathon-form";

export default function WalkathonRegistrationPage() {
  return (
    <div className="max-w-md mx-auto">
      <header className="text-center mb-3 mt-3">
        <h1 className="text-2xl font-heading">Walkathon Registration</h1>
      </header>

      <WalkathonForm />
    </div>
  );
}
