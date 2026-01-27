import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { motion } from "framer-motion";

const filterData = [
  {
    filterType: "Location",
    array: [
      "Dhaka",
      "Chittagong",
      "Khulna",
      "Mymensingh",
      "Barisal",
      "Sylhet",
      "Rajshahi",
      "Comilla",
      "Rangpur",
    ],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "UI/UX Designer",
      "Mobile App Developer",
      "Data Scientist",
      "Data Analyst",
      "Machine Learning Engineer",
      "AI Engineer",
      "Software Engineer",
    ],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "41-100k", "101k to 500k"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => setSelectedValue(value);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <motion.div
      className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="font-bold text-xl mb-3">Filter Jobs</h2>
      <hr className="border-gray-300 mb-4" />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <motion.div
            key={index}
            className="mb-5"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <h3 className="font-semibold text-md mb-2">{data.filterType}</h3>
            <div className="flex flex-wrap gap-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                return (
                  <motion.div
                    key={itemId}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center space-x-2 p-2 rounded-md cursor-pointer 
                      ${selectedValue === item ? "bg-[#6A38C2] text-white" : "bg-gray-100 text-gray-700"} 
                      transition-all duration-200`}
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <Label htmlFor={itemId} className="cursor-pointer">
                      {item}
                    </Label>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
