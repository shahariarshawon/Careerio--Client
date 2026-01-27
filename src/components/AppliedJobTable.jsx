import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const AppliedJobTable = () => {
  const { allAppliedJobs } = useSelector((store) => store.job);

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-gray-200 text-gray-800";
      case "accepted":
        return "bg-green-200 text-green-800";
      case "rejected":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
      <Table className="min-w-full">
        <TableCaption className="text-gray-500 text-sm py-2">
          A list of your applied jobs
        </TableCaption>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="text-left">Date</TableHead>
            <TableHead className="text-left">Job Role</TableHead>
            <TableHead className="text-left">Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allAppliedJobs.length <= 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-6 text-gray-500">
                You haven't applied to any jobs yet.
              </td>
            </tr>
          ) : (
            <AnimatePresence>
              {allAppliedJobs.map((appliedJob) => (
                <motion.tr
                  key={appliedJob._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <TableCell className="py-3 text-gray-700">
                    {appliedJob?.createdAt?.split("T")[0]}
                  </TableCell>
                  <TableCell className="py-3 font-medium text-gray-800">
                    {appliedJob.job?.title}
                  </TableCell>
                  <TableCell className="py-3 text-gray-700">
                    {appliedJob.job?.company?.name}
                  </TableCell>
                  <TableCell className="py-3 text-right">
                    <Badge
                      className={`px-3 py-1 rounded-full font-semibold hover:cursor-pointer hover:text-white ${statusColor(
                        appliedJob.status,
                      )}`}
                    >
                      {appliedJob.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </AnimatePresence>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
