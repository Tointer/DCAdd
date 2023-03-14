import {
  FADE_DOWN_ANIMATION_VARIANTS,
  FADE_IN_ANIMATION_SETTINGS,
} from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Twitter } from "lucide-react";
import { useFlowLogin } from "flow/hooks/useFlowLogin";
import LumiLogo from "../shared/lumi-logo";
import classNames from "classnames";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  const { user } = useFlowLogin();

  return (
    <>
      <Meta {...meta} />
      <SignInModal />
      <div className="fixed h-screen w-full bg-[#191B1F]" />
      <div
        className={`fixed top-0 w-full ${
          scrolled ? "bg-white/0 backdrop-blur-xl" : "bg-white/0"
        } z-10 transition-all`}
      >
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link
            href="/"
            className="relative flex items-center pl-2 font-display text-2xl"
          >
            {/* <LumiLogo /> */}
            <p className="absolute left-0 top-1/2 -translate-y-1/2 text-white">
              Metr
            </p>
            <video
              src="/metronome-logo.mp4"
              playsInline
              muted
              loop
              autoPlay
              className="mask h-8"
            />
            <p
              className={classNames(
                "absolute -right-4 text-white transition-colors",
              )}
            >
              nome
            </p>
          </Link>
          <div className="flex items-center space-x-4">
            <AnimatePresence>
              <motion.a
                href="https://flow.com/"
                target="_blank"
                rel="noreferrer"
                className="flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-[#00EF8B] border-opacity-80 px-7 py-2 text-[#00EF8B] transition-colors hover:bg-[#00EF8B] hover:bg-opacity-10"
                {...FADE_IN_ANIMATION_SETTINGS}
              >
                <Image
                  src="/flow-flow-logo.svg"
                  alt=""
                  className="h-5 w-5"
                  width={20}
                  height={20}
                />
                <p className="text-sm font-semibold">#OnFlow</p>
              </motion.a>
            </AnimatePresence>
            <AnimatePresence>
              {!user.loggedIn ? (
                <motion.button
                  className="rounded-full border border-black bg-white py-2 px-4 text-sm text-black transition-all hover:bg-white hover:text-black"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Connect wallet
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <main className="mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center py-20">
        {children}
      </main>
    </>
  );
}
