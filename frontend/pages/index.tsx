import Card from "@/components/home/card";
import Layout from "@/components/layout";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import {
  FADE_DOWN_ANIMATION_VARIANTS,
  SUPPORTED_TOKENS,
} from "@/lib/constants";
import { Github } from "@/components/shared/icons";
import { Loader } from "lucide-react";
import Link from "next/link";
import * as Label from "@radix-ui/react-label";
// import { Select } from "../components/shared/select";
import { useEffect, useState } from "react";
import { useFlowLogin } from "flow/hooks/useFlowLogin";
import dynamic from "next/dynamic";
import { getRemainingBalance, setupDCA } from "flow/metronome";

const SelectDynamic = dynamic(() => import("../components/shared/select"), {
  ssr: false,
});

export default function Home() {
  const [creatingDCA, setCreatingDCA] = useState(false);
  const [amount, setAmount] = useState<string | null>(null);
  const [days, setDays] = useState<string | null>(null);

  const [remainingBalance, setRemainingBalance] = useState("");

  const { user, logIn } = useFlowLogin();

  useEffect(() => {
    if (!user.loggedIn) {
      return;
    }

    const handleRemainingDCA = async () => {
      if (!user.addr) {
        return;
      }

      const remainingBalance = await getRemainingBalance(user.addr);
      setRemainingBalance(remainingBalance);
    };
    handleRemainingDCA();
  }, [user.loggedIn]);

  const handleSetupDCA = async () => {
    if (!days || !amount) {
      return;
    }

    const secondsInDay = 86400;

    try {
      setCreatingDCA(true);
      await setupDCA(`${Number(days) * secondsInDay}.0`, `${amount}.0`);
      if (user.addr) {
        const remainingBalance = await getRemainingBalance(user.addr);
        setRemainingBalance(remainingBalance);
      }
    } finally {
      setCreatingDCA(false);
    }
  };

  return (
    <Layout>
      <motion.div
        className="px-5 pt-5 xl:px-0"
        initial="hidden"
        whileInView="show"
        animate="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        <motion.h1
          className="mx-auto max-w-6xl bg-gradient-to-br from-white to-gray-300 bg-clip-text text-center font-display text-4xl font-bold tracking-[-0.02em] text-transparent drop-shadow-sm md:text-7xl md:leading-[5rem]"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Automate crypto investing</Balancer>
        </motion.h1>
        <motion.p
          className="mx-auto mt-6 max-w-5xl text-center text-gray-300 md:text-xl"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>
            Dollar cost average crypto buys in web3 using a non-custodial wallet
          </Balancer>
        </motion.p>
        <motion.div
          className="mx-auto mt-12 flex max-w-[420px] justify-center"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Card title="Setup DCA">
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1 text-left">
                <Label.Root className="text-left font-medium" htmlFor="token">
                  Token you give
                </Label.Root>
                <div>
                  <SelectDynamic
                    value={SUPPORTED_TOKENS[1].title}
                    onValueChange={() => {}}
                  />
                </div>
              </div>
              <div className="space-y-1 text-left">
                <Label.Root className="text-left font-medium" htmlFor="token">
                  Token you buy
                </Label.Root>
                <div className="w-full">
                  <SelectDynamic
                    value={SUPPORTED_TOKENS[0].title}
                    onValueChange={() => {}}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 flex flex-col space-y-1 text-left">
              <Label.Root className="text-left font-medium" htmlFor="amount">
                Amount daily (in USDC)
              </Label.Root>
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-75 hover:border-gray-800 focus:border-blue-500 focus:outline-none focus:ring-blue-500/20 active:bg-gray-100"
                type="text"
                id="amount"
                placeholder="10$"
                value={amount ?? ""}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="mt-2 flex flex-col space-y-1 text-left">
              <Label.Root className="text-left font-medium" htmlFor="days">
                How many days
              </Label.Root>
              <input
                className="h-9 rounded-md border border-gray-300 px-3 py-2 text-gray-700 placeholder-gray-400 transition-all duration-75 hover:border-gray-800 focus:border-blue-500 focus:outline-none focus:ring-blue-500/20 active:bg-gray-100"
                type="text"
                id="days"
                placeholder="3 days"
                value={days ?? ""}
                onChange={(e) => setDays(e.target.value)}
              />
            </div>
            {!user.loggedIn ? (
              <button
                onClick={logIn}
                className="mt-4 flex w-full items-center justify-center space-x-2 rounded-md border border-gray-600 px-3 py-2 text-center"
              >
                <span>Connect wallet</span>
              </button>
            ) : (
              <button
                onClick={() => handleSetupDCA()}
                className="mt-4 flex w-full items-center justify-center space-x-2 rounded-md border border-gray-600 px-3 py-2 text-center"
              >
                {creatingDCA && <Loader className="animate-spin" />}
                <span>Setup</span>
              </button>
            )}
          </Card>
        </motion.div>
        {remainingBalance && remainingBalance !== "0.00000000" ? (
          <motion.div
            className="mx-auto mt-6 flex max-w-[420px] justify-center"
            variants={FADE_DOWN_ANIMATION_VARIANTS}
          >
            <Card title="My DCA">
              <div className="mt-4 ">
                <p className="text-left font-medium">
                  Remaining balance (in USDT)
                </p>
                <div className="mt-1 flex items-center space-x-2">
                  <img
                    src={SUPPORTED_TOKENS[1].icon}
                    alt=""
                    className=" h-6 w-6 rounded-full"
                  />
                  <span className="font-bold">{remainingBalance}</span>
                </div>
                <div className="mt-4 text-left font-medium">Buying</div>
                <div className="mt-1 flex items-center space-x-2">
                  <img
                    src={SUPPORTED_TOKENS[0].icon}
                    alt=""
                    className=" h-6 w-6 rounded-full"
                  />
                  <span className="font-bold">FLOW</span>
                </div>
              </div>
            </Card>
          </motion.div>
        ) : null}
        <motion.div
          className="mt-16 flex justify-center"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <div>
            <Link
              href="https://github.com/tointer/Metronome"
              target="_blank"
              className="text-white opacity-70 transition-opacity hover:opacity-100"
            >
              <Github className="h-12 w-12" />
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </Layout>
  );
}
