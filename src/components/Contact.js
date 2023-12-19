import React, { useState, useTransition } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { GithubIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";

const Contact = () => {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({});
  const [isLoading, setisLoadin] = useState(false);
  const [isError, setisError] = useState(false);
  const { toast } = useToast();

  const handevalidate = (formData) => {
    let error = {};
    if (!formData?.name) {
      error.error = true;
      error.name = "Please enter a name";
    }
    if (!formData?.email) {
      error.error = true;
      error.email = "Please enter a email";
    }
    if (!formData?.message) {
      error.error = true;
      error.message = "Please enter a message";
    }
    return error;
  };
  const handleDatChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = handevalidate(formData);
    setisError(error);
    if (error.error) {
      return;
    }
    setisLoadin(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });
      console.log(response);

      if (response.ok) {
        toast({
          title: "Message Sent",
          description: "Thank you for contacting Me!",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send the message. Please try again later.",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description:
          "An error occurred while sending the message. Please try again later.",
        variant: "destructive",
      });
    }

    setFormData({});
    setisLoadin(false);
  };
  return (
    <>
      <Toaster />
      <div
        id="contact"
        className="min-h-screen flex flex-col  mt-10     mx-auto py-5 md:py-0 px-10"
      >
        <h1
          className="scroll-m-20 pt-5 text-3xl p-10
      text-center md:text-4xl  leading-[2] font-extrabold tracking-wide lg:text-5xl
      
      animate-text-color bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent"
        >
          Get in touch
        </h1>
        <form className="h-full p-5 flex flex-col gap-5 md:p-10  w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Input
            value={formData.name}
            onChange={handleDatChange}
            type="text"
            name="name"
            placeholder="Enter Your Name"
          />
          <p className="text-red-600"> {isError?.name} </p>
          <Input
            onChange={handleDatChange}
            type="email"
            name="email"
            value={formData.email}
            placeholder=" Enter Your Email"
          />
          <p className="text-red-600"> {isError?.email} </p>

          <Textarea
            value={formData.message}
            onChange={handleDatChange}
            className="h-[200px]"
            name="message"
            placeholder="Type your message here."
          />
          <p className="text-red-600"> {isError?.message} </p>

          <Button
            onClick={handleSubmit}
            className="bg-green-500"
            variant="secondary"
          >
            {isLoading ? "Sending Message..." : "Send Message"}
          </Button>
        </form>
        <div className="flex gap-3 justify-center items-center w-full md:w-3/4 lg:w-1/2 mx-auto my-10">
          <Link
            about="blank"
            href="https://www.linkedin.com/in/manoj-kumar-2805b2262/"
          >
            <Card className="p-3">
              <LinkedinIcon />
            </Card>
          </Link>
          <Link href="https://github.com/mk3638432">
            <Card className="p-3">
              <GithubIcon />
            </Card>
          </Link>
          {/* <Link href="https://dev.to/prems5">
            <Card className="p-3">
              <Image alt="dev.to" src="/dev.png" width={24} height={24} />
            </Card>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Contact;
