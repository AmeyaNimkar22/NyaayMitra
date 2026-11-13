import AppLayout from "@/components/layout/AppLayout";
import JusticeEmblemBackdrop from "@/components/auth/JusticeEmblemBackdrop";
import LoginCard from "@/components/auth/LoginCard";

export default function Login() {
  return (
    <AppLayout title="Login">
      <div className="relative flex flex-col w-full items-center justify-center py-10 sm:py-16 min-h-[70vh]">
        <JusticeEmblemBackdrop />
        <LoginCard />
      </div>
    </AppLayout>
  );
}
