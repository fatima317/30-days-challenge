'use client'
import { useState, ChangeEvent } from "react"
import {Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"

export default function TipCalculator() {
// State hooks for managing the bill amount, tip percentage, tip amount, and total amount
const [billAmount, setBillAmount] = useState<number | null>(null);
const [tipPercentage, setTipPercentage] = useState<number | null>(null);
const [tipAmount, setTipAmount] = useState<number>(0);
const [totalAmount, setTotalAmount] = useState<number>(0);

// Handler for updating bill amount state on input change
const handleBillAmountChange = (e: ChangeEvent<HTMLInputElement>) :void => {
    setBillAmount(parseFloat(e.target.value));
}

// Handler for updating tip percentage state on input change
const handleTipPercentageChange = (e: ChangeEvent<HTMLInputElement>) : void => {
    setTipPercentage(parseFloat(e.target.value));
}

 // Function to calculate the tip and total amounts
const calculateTip =() : void => {
    if(billAmount != null && tipPercentage != null){
        const tip = billAmount * (tipPercentage / 100)
        setTipAmount(tip)
        setTotalAmount(billAmount + tip)
    }
}

return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
            <CardHeader>
                <CardTitle>Tip Calculator</CardTitle>
                <CardDescription> Enter the bill amount and tip percentage to calculate the tip and
                total.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="bill-amount">Bill Amount</Label>
                    <Input
                        id="bill-amount"
                        type="number"
                        placeholder="Enter bill amount"
                        value={billAmount !== null ? billAmount : ""}
                        onChange={handleBillAmountChange}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="tip-percentage">Tip Percentage</Label>
                    <Input
                        id="tip-percentage"
                        type="number"
                        placeholder="Enter tip percentage"
                        value={tipPercentage !== null ? tipPercentage : ""}
                        onChange={handleTipPercentageChange}
                    />
                </div>
                <Button onClick={calculateTip}></Button>
            </CardContent>
            <CardFooter className="grid gap-2">
                <div className="flex items-center justify-between">
                    <span>Tip Amount:</span>
                    <span className="font-bold">${tipAmount.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                    <span>Total Amount:</span>
                    <span className="font-bold">${totalAmount.toFixed(2)}</span>
                </div>
            </CardFooter>
        </Card>
    </div>
)
}