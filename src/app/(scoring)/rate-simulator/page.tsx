"use client";

import { useState } from "react";
import CreateRateSimulator from "../components/create-rate-simulation-form";
import RateSimulation from "../components/rate-simulation";

export default function RateSimulator() {
  const [rateSimulation, setRateSimulation] = useState();

  return (
    <div className="flex flex-col gap-4">
      <CreateRateSimulator setRateSimulation={setRateSimulation} />
      <RateSimulation rateSimulation={rateSimulation} />
    </div>
  );
}
