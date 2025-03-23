"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/context/cart-context"
import { initiatePayment } from "@/lib/payment"

export default function CheckoutPage() {
  const { cartItems, discount } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    cardNumber: "",
    cardName: "",
    cardExpiry: "",
    cardCvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 150 : 0
  const total = subtotal + shipping - discount

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // This is where you would integrate with a real payment gateway
      const response = await initiatePayment({
        amount: total,
        currency: "INR",
        paymentMethod,
        cardDetails:
          paymentMethod === "card"
            ? {
                number: formState.cardNumber,
                name: formState.cardName,
                expiry: formState.cardExpiry,
                cvv: formState.cardCvv,
              }
            : undefined,
        customerInfo: {
          name: `${formState.firstName} ${formState.lastName}`,
          email: formState.email,
          phone: formState.phone,
          address: {
            line1: formState.address,
            city: formState.city,
            state: formState.state,
            postal_code: formState.pincode,
            country: "IN",
          },
        },
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      })

      // Simulate successful payment
      setTimeout(() => {
        setIsProcessing(false)
        setIsSuccess(true)
      }, 2000)
    } catch (error) {
      console.error("Payment failed:", error)
      setIsProcessing(false)
      alert("Payment failed. Please try again.")
    }
  }

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-12 px-4 text-center">
        <div className="bg-[#f9f5f0] p-8 rounded-md">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif text-[#8a5a44] mb-4">Order Placed Successfully!</h1>
          <p className="text-[#8a5a44] mb-6">
            Thank you for your purchase. Your order has been received and is being processed.
          </p>
          <p className="text-[#8a5a44] mb-8">
            Order #:{" "}
            {Math.floor(Math.random() * 1000000)
              .toString()
              .padStart(6, "0")}
          </p>
          <Link href="/">
            <Button className="bg-[#8a5a44] text-white hover:bg-[#6d4636]">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl md:text-3xl font-serif text-[#8a5a44] text-center mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <div className="bg-[#f9f5f0] p-6 rounded-md mb-6">
              <h2 className="text-xl font-serif text-[#8a5a44] mb-4">Shipping Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="firstName" className="text-[#8a5a44]">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formState.firstName}
                    onChange={handleInputChange}
                    required
                    className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-[#8a5a44]">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formState.lastName}
                    onChange={handleInputChange}
                    required
                    className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label htmlFor="email" className="text-[#8a5a44]">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-[#8a5a44]">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    required
                    className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                  />
                </div>
              </div>

              <div className="mb-4">
                <Label htmlFor="address" className="text-[#8a5a44]">
                  Address
                </Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formState.address}
                  onChange={handleInputChange}
                  required
                  className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="city" className="text-[#8a5a44]">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    value={formState.city}
                    onChange={handleInputChange}
                    required
                    className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-[#8a5a44]">
                    State
                  </Label>
                  <Input
                    id="state"
                    name="state"
                    value={formState.state}
                    onChange={handleInputChange}
                    required
                    className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                  />
                </div>
                <div>
                  <Label htmlFor="pincode" className="text-[#8a5a44]">
                    Pincode
                  </Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formState.pincode}
                    onChange={handleInputChange}
                    required
                    className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#f9f5f0] p-6 rounded-md">
              <h2 className="text-xl font-serif text-[#8a5a44] mb-4">Payment Method</h2>

              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center text-[#8a5a44]">
                    <CreditCard className="mr-2 h-4 w-4" /> Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="upi" id="upi" />
                  <Label htmlFor="upi" className="text-[#8a5a44]">
                    UPI
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod" className="text-[#8a5a44]">
                    Cash on Delivery
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-[#8a5a44]">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formState.cardNumber}
                      onChange={handleInputChange}
                      required
                      className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardName" className="text-[#8a5a44]">
                      Name on Card
                    </Label>
                    <Input
                      id="cardName"
                      name="cardName"
                      value={formState.cardName}
                      onChange={handleInputChange}
                      required
                      className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cardExpiry" className="text-[#8a5a44]">
                        Expiry Date
                      </Label>
                      <Input
                        id="cardExpiry"
                        name="cardExpiry"
                        placeholder="MM/YY"
                        value={formState.cardExpiry}
                        onChange={handleInputChange}
                        required
                        className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cardCvv" className="text-[#8a5a44]">
                        CVV
                      </Label>
                      <Input
                        id="cardCvv"
                        name="cardCvv"
                        type="password"
                        maxLength={4}
                        value={formState.cardCvv}
                        onChange={handleInputChange}
                        required
                        className="border-[#e0c9b1] focus:ring-[#8a5a44]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "upi" && (
                <div>
                  <Label htmlFor="upiId" className="text-[#8a5a44]">
                    UPI ID
                  </Label>
                  <Input id="upiId" placeholder="name@upi" className="border-[#e0c9b1] focus:ring-[#8a5a44]" />
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Link href="/cart">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-[#8a5a44] text-[#8a5a44] hover:bg-[#8a5a44] hover:text-white"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                  </Button>
                </Link>
                <Button type="submit" className="bg-[#8a5a44] text-white hover:bg-[#6d4636]" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-[#f9f5f0] p-6 rounded-md h-fit">
          <h2 className="text-xl font-serif text-[#8a5a44] mb-4">Order Summary</h2>

          <div className="space-y-4 mb-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.type}`} className="flex justify-between text-[#8a5a44]">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>₹ {(item.price * item.quantity).toLocaleString()}</span>
              </div>
            ))}
          </div>

          <Separator className="bg-[#e0c9b1] my-4" />

          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[#8a5a44]">
              <span>Subtotal</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-[#8a5a44]">
              <span>Shipping</span>
              <span>₹ {shipping.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-[#8a5a44]">
                <span>Discount</span>
                <span>- ₹ {discount.toLocaleString()}</span>
              </div>
            )}
            <Separator className="bg-[#e0c9b1]" />
            <div className="flex justify-between text-[#8a5a44] font-bold">
              <span>Total</span>
              <span>₹ {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

